from fastapi import APIRouter

from ..core.models import BirthData
from ..services import panchang as P

router = APIRouter(prefix="/panchang", tags=["panchang"])


@router.post("/day")
def day(birth: BirthData):
    """Daily Panchang from sunrise: tithi, nakshatra, yoga, karana (with end times),
    weekday, paksha, month, ritu, and sun/moon rise/set — all in local time."""
    return P.daily_panchang(birth.julian_day(), birth.latitude, birth.longitude,
                            birth.timezone_offset)


@router.post("/muhurta")
def muhurta(birth: BirthData):
    """Auspicious and inauspicious timings for the day (Rahu Kaal, Yamaganda, Gulika,
    Dur Muhurtam, Abhijit, Brahma/Vijaya/Godhuli Muhurta) in local time."""
    return P.muhurtas(birth.julian_day(), birth.latitude, birth.longitude,
                      birth.timezone_offset)


@router.post("/hora")
def hora(birth: BirthData):
    """Planetary horas for the full Vedic day (sunrise to next sunrise), in local time."""
    return P.hora(birth.julian_day(), birth.latitude, birth.longitude,
                  birth.timezone_offset)


@router.post("/choghadiya")
def choghadiya(birth: BirthData):
    """Gauri Choghadiya: 8 day + 8 night slots with good/bad quality, in local time."""
    return P.choghadiya(birth.julian_day(), birth.latitude, birth.longitude,
                        birth.timezone_offset)
