from fastapi import APIRouter

from ..core.models import BasicNumerologyRequest, NameRequest, PhoneRequest
from ..services import numerology as N

router = APIRouter(prefix="/numerology", tags=["numerology"])


@router.post("/basic")
def basic(req: BasicNumerologyRequest):
    return N.basic_numerology(req.date_of_birth, req.full_name, req.gender)


@router.post("/name")
def name(req: NameRequest):
    return N.name_numerology(req.name, req.system)


@router.post("/phone")
def phone(req: PhoneRequest):
    return N.phone_numerology(req.phone)
