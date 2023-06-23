from fastapi import APIRouter
from queries.options import OptionIn
from externals.google_place import get_options


router = APIRouter()


@router.post("/options")
def create_options(option: OptionIn):
    pass
