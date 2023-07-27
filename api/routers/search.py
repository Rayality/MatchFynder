from fastapi import APIRouter, Depends, Response, HTTPException, status
from queries.search import (
    Search,
    SearchOptions,
    SearchRepository,
    SearchOptionsLink,
    SingleSearch,
    MatchMade,
)
from queries.options import Error
from typing import Union
from auth.authenticator import authenticator

router = APIRouter()
not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


# create search
@router.post("/search/create")
def create_search(
    response: Response,
    repo: SearchRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        owner = account_data.get("id")
        return repo.create_search({"owner": owner})
    else:
        raise not_authorized


# get search finders
@router.get("/search/{search_id}/finders")
def get_search_finders(
    search_id: int,
    response: Response,
    repo: SearchRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.get_search_finders(search_id)
    else:
        raise not_authorized


# add search option
@router.post(
    "/search/{search_id}/options",
    response_model=Union[list[SearchOptions], Error],
)
def add_search_option(
    s: SearchOptionsLink,
    response: Response,
    repo: SearchRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.add_search_option(s.search_id, s.option_id)
    else:
        raise not_authorized


# get search options
@router.get(
    "/search/{search_id}/options",
    response_model=Union[list[SearchOptions], Error],
)
def get_search_options(
    search_id: int, response: Response, repo: SearchRepository = Depends()
):
    return repo.get_search_options(search_id)


# update edible count
@router.post(
    "/search/{search_id}/options/{option_id}", response_model=Union[int, Error]
)
def update_edible_count(
    s: SearchOptionsLink,
    response: Response,
    repo: SearchRepository = Depends(),
):
    return repo.update_edible_count(s.search_id, s.option_id)


# set match made to true
@router.put("/search/{search_id}", response_model=Union[bool, Error])
def update_match_made(
    search_id: int, response: Response, repo: SearchRepository = Depends()
):
    return repo.set_match_made_true(search_id)


@router.get("/search/", response_model=Union[list[SingleSearch], Error])
def get_searches(
    response: Response,
    repo: SearchRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.get_searches()
    else:
        raise not_authorized


@router.get("/search/{search_id}/", response_model=Union[SingleSearch, Error])
def get_single_search(
    search_id: int,
    response: Response,
    repo: SearchRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> SingleSearch:
    if account_data:
        return repo.get_single_search(search_id)
    else:
        raise not_authorized


@router.get(
    "/search/{search_id}/match_made", response_model=Union[MatchMade, Error]
)
def get_match_made(
    search_id: int, response: Response, repo: SearchRepository = Depends()
) -> MatchMade:
    return repo.get_match_made(search_id)


@router.get("/search/{search_id}/options/")
def get_options_by_search(
    search_id: int, response: Response, repo: SearchRepository = Depends()
):
    return repo.get_options_by_search(search_id)


@router.get("/search/{search_id}/options/next/")
def get_next_page(search_id: int, repo: SearchRepository = Depends()):
    return repo.get_next_options(search_id)
