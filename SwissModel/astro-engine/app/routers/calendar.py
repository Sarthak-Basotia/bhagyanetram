import datetime as _dt

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..services import calendar_svc

router = APIRouter(prefix="/calendar", tags=["calendar"])


class CalendarRequest(BaseModel):
    type: str = Field(..., description="rahu_kaal | choghadiya | panchak | bhadra")
    from_date: _dt.date = Field(..., alias="from")
    to_date: _dt.date = Field(..., alias="to")
    latitude: float
    longitude: float
    timezone_offset: float

    model_config = {"populate_by_name": True}


@router.post("")
def calendar(req: CalendarRequest):
    """Timing over a date range: Rahu-Kaal, Choghadiya, Panchak or Bhadra."""
    try:
        return calendar_svc.build_calendar(req.type, req.from_date, req.to_date,
                                           req.latitude, req.longitude, req.timezone_offset)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
