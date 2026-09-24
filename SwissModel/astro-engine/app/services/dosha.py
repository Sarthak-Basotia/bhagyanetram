"""Doshas: Mangal Dosh (Kuja/Manglik) and Sade Sati (Saturn's 7.5-year transit)."""
from __future__ import annotations

import datetime as _dt

import swisseph as swe

from ..core import constants as C
from ..core import ephemeris as E

# Houses that make a person Manglik when Mars occupies them (counted from a reference).
# 1,4,7,8,12 are universal; the 2nd house is the South-Indian addition; the 1st (lagna)
# is included per the common North-Indian / AstroSage convention (Sanjay Rath omits it).
_MANGAL_HOUSES = {1, 2, 4, 7, 8, 12}

# Sign-specific cancellations: {mars_house_from_lagna: {signs where Mars does no harm}}
# (BV Raman). Sign indices: Aries=0 ... Pisces=11.
_SIGN_CANCEL = {
    2: {2, 5},    # Gemini, Virgo
    4: {0, 7},    # Aries, Scorpio
    7: {3, 9},    # Cancer, Capricorn
    8: {8, 11},   # Sagittarius, Pisces
    12: {1, 6},   # Taurus, Libra
}


def _aspects(from_sign: int, to_sign: int, offsets: set[int]) -> bool:
    """True if a planet at from_sign aspects to_sign (offsets are 0-indexed house gaps)."""
    return (to_sign - from_sign) % 12 in offsets


def mangal_dosha(jd: float, lat: float, lon: float) -> dict:
    """Manglik (Kuja/Mangal Dosha) check from Lagna, Moon and Venus, with cancellations.

    Dosha if Mars occupies houses 1/2/4/7/8/12 from any reference. Also evaluates the
    classical cancellation (Mangal Dosha Bhanga) rules and returns an effective status.
    """
    positions = E.get_positions(jd)
    asc = E.get_ascendant(jd, lat, lon)
    mars = positions["Mars"]
    mars_sign = mars.sign_index
    lagna_sign = asc.sign_index
    mars_house_lagna = E.whole_sign_house(mars_sign, lagna_sign)

    refs = {
        "from_lagna": lagna_sign,
        "from_moon": positions["Moon"].sign_index,
        "from_venus": positions["Venus"].sign_index,
    }
    detail = {}
    for label, ref_sign in refs.items():
        house = E.whole_sign_house(mars_sign, ref_sign)
        detail[label] = {"mars_house": house, "dosha": house in _MANGAL_HOUSES}

    # PRIMARY verdict (Indian standard): Mars's house from the Ascendant (Lagna).
    # Mars in 1/2/4/7/8/12 from Lagna => Manglik.
    is_manglik = detail["from_lagna"]["dosha"]
    status = "Manglik" if is_manglik else "Non-Manglik"

    # Moon / Venus are SECONDARY references some (stricter) traditions also consider.
    # They are reported for information but do NOT change the Lagna-based verdict.
    secondary = [label for label in ("from_moon", "from_venus") if detail[label]["dosha"]]
    flagged = (["from_lagna"] if is_manglik else []) + secondary

    # --- Mitigating factors (Bhanga) ---
    # ADVISORY ONLY. Classical texts and astrologers disagree on these, so they do NOT
    # override the placement verdict; they are reported for the user's information.
    jup_sign = positions["Jupiter"].sign_index
    ven_sign = positions["Venus"].sign_index
    moon_sign = positions["Moon"].sign_index
    mitigating = []
    if is_manglik:
        if mars_sign in C.OWN_SIGNS["Mars"]:
            mitigating.append(f"Mars in own sign ({C.SIGNS[mars_sign]})")
        if mars_sign == C.EXALTATION["Mars"][0]:
            mitigating.append("Mars exalted (Capricorn)")
        if mars_sign in (4, 10):
            mitigating.append(f"Mars in {C.SIGNS[mars_sign]} (BV Raman exception)")
        if lagna_sign in (3, 4):
            mitigating.append(f"Lagna in {C.SIGNS[lagna_sign]} (Mars is yogakaraka)")
        if C.SIGN_LORD[lagna_sign] == "Mars":
            mitigating.append("Mars is the lagna lord")
        if jup_sign == mars_sign:
            mitigating.append("Mars conjunct Jupiter")
        elif _aspects(jup_sign, mars_sign, {4, 6, 8}):
            mitigating.append("Mars aspected by Jupiter")
        if jup_sign == lagna_sign or ven_sign == lagna_sign:
            mitigating.append("Jupiter or Venus in lagna")
        if moon_sign == mars_sign:
            mitigating.append("Mars conjunct Moon")
        if mars.retrograde:
            mitigating.append("Mars retrograde")
        if mars_house_lagna in _SIGN_CANCEL and mars_sign in _SIGN_CANCEL[mars_house_lagna]:
            mitigating.append(
                f"Mars in {C.SIGNS[mars_sign]} in the {mars_house_lagna}th house (sign exception)")

    interpretation = _mangal_interpretation(status, is_manglik, detail, secondary,
                                            mitigating, C.SIGNS[mars_sign])

    return {
        "is_manglik": is_manglik,
        "effective_status": status,
        "interpretation": interpretation,
        "mars_sign": C.SIGNS[mars_sign],
        "mars_house_from_lagna": mars_house_lagna,
        "manglik_houses_used": sorted(_MANGAL_HOUSES),
        "detail": detail,
        # Moon/Venus references that also show the dosha (informational, do NOT change verdict)
        "secondary_references": secondary,
        # ADVISORY ONLY — traditional Bhanga factors some astrologers weigh.
        "mitigating_factors": mitigating,
    }


_REF_LABEL = {"from_lagna": "the Ascendant (Lagna)", "from_moon": "the Moon",
              "from_venus": "Venus"}


def _ordinal(n: int) -> str:
    if 10 <= n % 100 <= 20:
        suffix = "th"
    else:
        suffix = {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return f"{n}{suffix}"


def _mangal_interpretation(status, is_manglik, detail, secondary, mitigating, mars_sign) -> str:
    """Plain-language summary of the Manglik result. Descriptive, not predictive."""
    lagna_house = _ordinal(detail["from_lagna"]["mars_house"])
    note = (
        " Note: Manglik analysis is a belief within Vedic astrology and interpretations "
        "vary between schools; this is a descriptive reading, not a prediction."
    )

    if not is_manglik:
        base = (
            f"Non-Manglik. Mars (in {mars_sign}) sits in the {lagna_house} house from the "
            "Ascendant, which is not one of the Manglik houses (1, 2, 4, 7, 8, 12), so "
            "Mangal Dosha is not formed."
        )
        if secondary:
            where = ", ".join(
                f"the {_ordinal(detail[r]['mars_house'])} house from {_REF_LABEL[r]}"
                for r in secondary)
            base += (
                f" (Stricter traditions that also check the Moon and Venus would note Mars in "
                f"{where}; this engine treats those as secondary and keeps the Lagna-based verdict.)"
            )
        return base + note

    base = (
        f"Manglik. Mars (in {mars_sign}) sits in the {lagna_house} house from the Ascendant, "
        "one of the Manglik houses (1, 2, 4, 7, 8, 12)."
    )
    if secondary:
        where = ", ".join(
            f"the {_ordinal(detail[r]['mars_house'])} house from {_REF_LABEL[r]}"
            for r in secondary)
        base += f" It is also confirmed from {where}."
    if mitigating:
        base += (
            f" Some astrologers note mitigating (Bhanga) factors that may reduce its effect: "
            f"{'; '.join(mitigating)}. These vary by school and are advisory only — they do not "
            "change the placement-based verdict."
        )
    return base + note


_DAY = 1.0  # Julian days


def _saturn_sign(jd: float) -> int:
    return int(E.body_longitude(jd, "Saturn") // 30)


def _fmt_date(jd: float) -> str:
    y, m, d, _ = swe.revjul(jd, swe.GREG_CAL)
    return f"{y:04d}-{m:02d}-{d:02d}"


def _saturn_ingresses(jd_start: float, jd_end: float, step: float = 4.0) -> list[tuple[float, int, bool]]:
    """(jd, new_sign, retrograde) for each transit-Saturn sign change in the window.

    retrograde = True when the sign change is backward (new_sign one before old), which
    happens when Saturn enters a sign while moving retrograde.
    """
    out = []
    jd = jd_start
    prev = _saturn_sign(jd)
    while jd < jd_end:
        s = _saturn_sign(jd)
        if s != prev:
            lo, hi = jd - step, jd            # bisect the boundary to ~1 day
            for _ in range(30):
                mid = (lo + hi) / 2
                if _saturn_sign(mid) == prev:
                    lo = mid
                else:
                    hi = mid
            retro = (s == (prev - 1) % 12)    # moved backward -> retrograde entry
            out.append((hi, s, retro))
            prev = s
        jd += step
    return out


def _build_cycle(rising_start, t_peak, t_set, t_end, signs, transit_jd):
    """Assemble one Sade Sati cycle (3 summary phases) from its rising-phase start."""
    s12, s1, s2 = signs
    hi = rising_start + 9 * 365.25          # a Sade Sati lasts ~7.5y; 9y bounds one cycle

    def last_in(lst):
        xs = [j for j in lst if rising_start < j <= hi]
        return max(xs) if xs else None

    peak_start, setting_start, cycle_end = last_in(t_peak), last_in(t_set), last_in(t_end)
    if not (peak_start and setting_start and cycle_end):
        return None

    return {
        "start": _fmt_date(rising_start),
        "end": _fmt_date(cycle_end),
        "is_current": rising_start <= transit_jd <= cycle_end,
        "phases": [
            {"phase": "Rising (First)", "sign": C.SIGNS[s12],
             "start": _fmt_date(rising_start), "end": _fmt_date(peak_start)},
            {"phase": "Peak (Second)", "sign": C.SIGNS[s1],
             "start": _fmt_date(peak_start), "end": _fmt_date(setting_start)},
            {"phase": "Setting (Third)", "sign": C.SIGNS[s2],
             "start": _fmt_date(setting_start), "end": _fmt_date(cycle_end)},
        ],
    }


def sade_sati(birth_jd: float, transit_jd: float, timeline_years: int = 100) -> dict:
    """Sade Sati / Dhaiya analysis: transit Saturn relative to the NATAL Moon sign.

    Returns the current status/phase at `transit_jd` PLUS every Sade Sati cycle over
    `timeline_years` from birth (Saturn returns ~every 29.5y, so ~3-4 cycles per 100y).
    """
    moon_sign = E.get_positions(birth_jd)["Moon"].sign_index
    saturn_sign_now = _saturn_sign(transit_jd)
    rel = (saturn_sign_now - moon_sign) % 12  # 0 = Saturn over natal Moon

    s12, s1, s2, s3 = ((moon_sign - 1) % 12, moon_sign,
                       (moon_sign + 1) % 12, (moon_sign + 2) % 12)
    s11 = (moon_sign - 2) % 12  # 11th from Moon (sign just before the Sade Sati zone)

    phase_now = {11: "Rising (First)", 0: "Peak (Second)", 1: "Setting (Third)"}.get(rel)
    is_active = phase_now is not None
    dhaiya = None
    if rel == 3:
        dhaiya = "Kantaka Shani / Ardha-ashtama (Saturn in 4th from Moon)"
    elif rel == 7:
        dhaiya = "Ashtama Shani (Saturn in 8th from Moon)"

    # Wide ingress timeline: birth-3y .. birth+timeline_years, and enough around today.
    scan_lo = birth_jd - 3 * 365.25
    scan_hi = max(birth_jd + timeline_years * 365.25, transit_jd + 12 * 365.25)
    ingresses = _saturn_ingresses(scan_lo, scan_hi)

    def forward_transitions(from_sign, to_sign):
        return [ingresses[i][0] for i in range(1, len(ingresses))
                if ingresses[i][1] == to_sign and ingresses[i - 1][1] == from_sign
                and not ingresses[i][2]]  # forward (direct) sign change only

    t_start = forward_transitions(s11, s12)
    t_peak = forward_transitions(s12, s1)
    t_set = forward_transitions(s1, s2)
    t_end = forward_transitions(s2, s3)

    # Every cycle within the timeline window (from birth). Skip retrograde re-entries
    # that fall inside an already-captured cycle (they aren't new cycles).
    all_cycles = []
    covered_until = float("-inf")
    for rs in sorted(t_start):
        if rs > birth_jd + timeline_years * 365.25 or rs <= covered_until:
            continue
        cyc = _build_cycle(rs, t_peak, t_set, t_end, (s12, s1, s2), transit_jd)
        if cyc:
            cyc["cycle_number"] = len(all_cycles) + 1
            all_cycles.append(cyc)
            covered_until = rs + 9 * 365.25   # bound this cycle; next real one is ~29y later

    # The current-or-next cycle (for the top-level summary).
    current = next((c for c in all_cycles if c["is_current"]), None)
    if current is None:
        upcoming = [c for c in all_cycles if c["start"] > _fmt_date(transit_jd)]
        current = upcoming[0] if upcoming else None
    phases = current["phases"] if current else []
    sade_start = current["start"] if current else None
    sade_end = current["end"] if current else None

    return {
        "moon_sign": C.SIGNS[moon_sign],
        "reference_date": _fmt_date(transit_jd),
        "saturn_sign": C.SIGNS[saturn_sign_now],
        "saturn_from_moon_house": rel + 1,
        "is_active": is_active,
        "current_phase": phase_now,
        "dhaiya": dhaiya,
        "sade_sati_start": sade_start,
        "sade_sati_end": sade_end,
        "phases": phases,
        "total_cycles_in_timeline": len(all_cycles),
        "all_cycles": all_cycles,
        "interpretation": _sade_interpretation(is_active, phase_now, dhaiya, phases,
                                               C.SIGNS[moon_sign], _fmt_date(transit_jd)),
    }


def _sade_interpretation(is_active, phase_now, dhaiya, phases, moon_sign, ref_date) -> str:
    note = (" Note: Sade Sati is a Vedic-astrology transit concept; this is a descriptive "
            "reading, not a prediction of events.")
    if is_active:
        cur = next((p for p in phases if p["phase"] == phase_now), None)
        msg = (f"As of {ref_date}, Sade Sati is ACTIVE — transit Saturn is in the "
               f"{phase_now} phase relative to the natal Moon ({moon_sign}).")
        if cur:
            msg += f" This phase runs from {cur['start']} to {cur['end']}."
        if phases:
            msg += f" The full Sade Sati spans {phases[0]['start']} to {phases[-1]['end']}."
        return msg + note
    base = f"As of {ref_date}, Sade Sati is NOT active for a {moon_sign} Moon."
    if dhaiya:
        base += f" However, a Dhaiya (small Panoti) is running: {dhaiya}."
    if phases:
        base += (f" The next Sade Sati begins {phases[0]['start']} and ends "
                 f"{phases[-1]['end']}.")
    return base + note
