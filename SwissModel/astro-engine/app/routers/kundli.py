import datetime as _dt

from fastapi import APIRouter, HTTPException

from ..core import ephemeris as E
from ..core.models import BirthData
from ..services import charts, combinations, dasha, dosha, yoga

router = APIRouter(prefix="/kundli", tags=["kundli"])


@router.post("/lagna")
def lagna(birth: BirthData):
    return charts.lagna_chart(birth.julian_day(), birth.latitude, birth.longitude)


@router.post("/divisional/{dcf}")
def divisional(dcf: int, birth: BirthData):
    try:
        return charts.divisional_chart(birth.julian_day(), birth.latitude, birth.longitude, dcf)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/chandra")
def chandra(birth: BirthData):
    return charts.chandra_chart(birth.julian_day(), birth.latitude, birth.longitude)


@router.post("/transit")
def transit(birth: BirthData, as_of: _dt.date | None = None):
    """Gochar (transit) chart. `as_of` = transit date (default: today).

    Planets' current positions with each one's house from the natal Moon and natal Lagna.
    """
    if as_of is None:
        transit_jd = E.to_julian_day(_dt.datetime.now(_dt.timezone.utc))
    else:
        transit_jd = E.to_julian_day(_dt.datetime(as_of.year, as_of.month, as_of.day, 12, 0,
                                                  tzinfo=_dt.timezone.utc))
    return charts.transit_chart(birth.julian_day(), transit_jd, birth.latitude, birth.longitude)


@router.post("/dasha")
def vimshottari(birth: BirthData, levels: int = 3):
    levels = max(1, min(3, levels))
    return dasha.compute_vimshottari(birth.julian_day(), birth.to_utc(), levels)


@router.post("/dosha/mangal")
def mangal(birth: BirthData):
    return dosha.mangal_dosha(birth.julian_day(), birth.latitude, birth.longitude)


@router.post("/dosha/sade-sati")
def sade_sati(birth: BirthData, as_of: _dt.date | None = None, timeline_years: int = 100):
    """Sade Sati for the natal Moon.

    `as_of` = transit date to evaluate current status (default: today).
    `timeline_years` = span from birth for the full list of cycles (default 100).
    """
    if as_of is None:
        transit_jd = E.to_julian_day(_dt.datetime.now(_dt.timezone.utc))
    else:
        transit_jd = E.to_julian_day(_dt.datetime(as_of.year, as_of.month, as_of.day, 12, 0,
                                                  tzinfo=_dt.timezone.utc))
    timeline_years = max(10, min(120, timeline_years))
    return dosha.sade_sati(birth.julian_day(), transit_jd, timeline_years)


@router.post("/rajyoga")
def rajyoga(birth: BirthData):
    return yoga.detect_raj_yogas(birth.julian_day(), birth.latitude, birth.longitude)


@router.post("/yogas-doshas")
def yogas_doshas(birth: BirthData):
    """Detect all yogas and doshas present in the chart, with descriptions and remedies."""
    return combinations.all_combinations(birth.julian_day(), birth.latitude, birth.longitude)
