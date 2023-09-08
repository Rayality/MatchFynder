from fastapi import APIRouter, Depends, Response, HTTPException, status
from auth.authenticator import authenticator
from queries.options import (
    OptionIn,
    OptionOut,
    OptionRepository,
    Error,
)
from typing import Union

router = APIRouter()
not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.post("/options")
def create_option(
    option: OptionIn,
    response: Response,
    repo: OptionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        response.status_code = 200
        return repo.create(option)
    else:
        raise not_authorized


@router.get("/options", response_model=Union[list[OptionOut], Error])
def get_options(
    response: Response,
    repo: OptionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        response.status_code = 200
        return repo.get_options()
    else:
        raise not_authorized


@router.put("/options/{option_id}", response_model=Union[OptionOut, Error])
def update_option(
    option_id: int,
    option: OptionIn,
    repo: OptionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, OptionOut]:
    if account_data:
        return repo.update_option(option_id, option)
    else:
        raise not_authorized


@router.delete("/options/{option_id}", response_model=bool)
def delete_option(
    option_id: int,
    repo: OptionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if account_data:
        return repo.delete_option(option_id)
    else:
        raise not_authorized


@router.get("/options/{option_id}", response_model=Union[OptionOut, Error])
def get_single_option(
    option_id: int,
    repo: OptionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> OptionOut:
    if account_data:
        return repo.get_single_option(option_id)
    else:
        raise not_authorized
