from fastapi import APIRouter
from queries.options import OptionIn, OptionOut
from externals.google_place import get_google_options


router = APIRouter()


@router.post("/options")
def create_options(option: OptionIn):
    options = get_google_options(**option)


@router.get("/options")
def get_options(option: OptionOut):
    pass
