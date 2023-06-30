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



@router.get("/options", response_model=Union[Error, list[OptionOut]])
def get_options(
    response: Response,
    repo: OptionRepository = Depends(),
):
    response.status_code = 200
    return repo.get_options()

@router.put("/options/{option_id}", response_model=Union[Error, OptionOut])
def update_option(
    option_id: int,
    option: OptionIn,
    repo: OptionRepository = Depends(),
) -> Union[Error, OptionOut]:
    return repo.update_option(option_id, option)

@router.delete("/options/{option_id}", response_model = bool)
def delete_option(
    option_id: int,
    repo: OptionRepository = Depends(),
) -> bool:
    return repo.delete_option(option_id)

@router.get('/options/{option_id}', response_model = Union[OptionOut, Error])
def get_single_option(
    option_id: int,
    repo: OptionRepository = Depends(),
) -> OptionOut:
    return repo.get_single_option(option_id)
