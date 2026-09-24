from fastapi import APIRouter

from ..core.models import MatchRequest
from ..services import matchmaking

router = APIRouter(prefix="/match", tags=["matchmaking"])


@router.post("/ashtakoota")
def ashtakoota(req: MatchRequest):
    """Couple compatibility: Ashtakoota Guna Milan (36 points) + Manglik matching."""
    b, g = req.boy, req.girl
    return matchmaking.match(b.julian_day(), b.latitude, b.longitude,
                             g.julian_day(), g.latitude, g.longitude)
