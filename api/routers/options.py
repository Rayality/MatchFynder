from fastapi import APIRouter, Depends, Response
from queries.options import (
    OptionIn,
    OptionOut,
    OptionRepository,
    Error,
)
from typing import Union

router = APIRouter()


@router.post("/options", response_model=Union[OptionOut, Error])
def create_option(
    option: OptionIn,
    response: Response,
    repo: OptionRepository = Depends()
):
    response.status_code = 200
    return repo.create(option)
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
