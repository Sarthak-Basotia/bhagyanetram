"""Pydantic request schemas shared across routers."""
from __future__ import annotations

import datetime as _dt

from pydantic import BaseModel, Field

from . import ephemeris as E


class BirthData(BaseModel):
    """A birth/event moment.

    Send the birth **local wall-clock time** (as entered, e.g. 2001-07-11T11:56:00)
    and set `timezone_offset` to the place's zone. Do NOT pre-convert to UTC.

    If `datetime` carries an explicit timezone (a trailing `Z` or `+05:30`), that is
    honored as-is and `timezone_offset` is ignored — so both of these are equivalent:
        {"datetime": "2001-07-11T11:56:00",  "timezone_offset": 5.5}   # naive local
        {"datetime": "2001-07-11T06:26:00Z", "timezone_offset": 5.5}   # explicit UTC
    """
    datetime: _dt.datetime = Field(
        ..., description="Local wall-clock date-time, e.g. 2001-07-11T11:56:00 (no 'Z')")
    timezone_offset: float = Field(..., description="Hours from UTC, e.g. 5.5 for IST")
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)

    def to_utc(self) -> _dt.datetime:
        # If the caller supplied an explicit tz (Z / +05:30), trust it and convert.
        if self.datetime.tzinfo is not None:
            return self.datetime.astimezone(_dt.timezone.utc)
        # Otherwise interpret the naive datetime as local time in timezone_offset.
        tz = _dt.timezone(_dt.timedelta(hours=self.timezone_offset))
        return self.datetime.replace(tzinfo=tz).astimezone(_dt.timezone.utc)

    def julian_day(self) -> float:
        return E.to_julian_day(self.to_utc())


class MatchRequest(BaseModel):
    """Two birth charts for couple matchmaking. `gender` on each is optional (for Manglik)."""
    boy: BirthData
    girl: BirthData


class NameRequest(BaseModel):
    name: str
    system: str = Field("chaldean", pattern="^(chaldean|pythagorean)$")


class PhoneRequest(BaseModel):
    phone: str


class BasicNumerologyRequest(BaseModel):
    date_of_birth: _dt.date
    full_name: str | None = None
    gender: str | None = Field(None, description="'male' or 'female' — enables Kua directions")
