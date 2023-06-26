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
