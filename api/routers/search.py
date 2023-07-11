from fastapi import APIRouter, Depends, Response
from queries.search import (
    Search,
    SearchOut,
    SearchOptions,
    SearchRepository,
    SearchOptionsLink,
    SearchDad,
    MatchMade

)
from queries.options import Error
from typing import Union

router = APIRouter()


@router.post(
        "/search/{search_id}/options/{option_id}", response_model=Union[Error, int]
)
def update_edible_option(s: SearchOptionsLink, response: Response, repo: SearchRepository = Depends()):
    return repo.update_edible_count(s.search_id, s.option_id)


@router.get(
        "/search/{search_id}/options", response_model=Union[list[SearchOptions], Error]
)
def get_search_options(search_id: int, response: Response, repo: SearchRepository = Depends()):
    return repo.get_search_options(search_id)

#
@router.post(
    "/search/{search_id}/options"
)
def add_search_option(s: SearchOptionsLink, response: Response, repo: SearchRepository = Depends()):
    return repo.add_search_option(s.search_id, s.option_id)

@router.get(
        "/search/{search_id}/finders", response_model=Union[list[int], Error]
)
def get_search_finders(search_id: int, response: Response, repo: SearchRepository = Depends()):
    return repo.get_search_finders(search_id)


@router.post(
        "/search/create", response_model=Union[Error, SearchOut]
)
def create_search(search: Search, response: Response, repo: SearchRepository = Depends()):
    return repo.create_search(search)




@router.get(
    "/search/", response_model=Union[list[SearchDad], Error]
)
def get_searches(response: Response, repo: SearchRepository = Depends()):
    return repo.get_search()

@router.get(
    "/search/{search_id}/", response_model = Union[Search, Error]
)
def get_single_search(search_id: int, response: Response, repo: SearchRepository = Depends()) -> Search:
    return repo.get_single_search(search_id)

@router.get(
    "/search/{search_id}/match_made", response_model =Union[MatchMade, Error]
)
def get_match_made(search_id: int, response: Response, repo: SearchRepository = Depends()) -> MatchMade:
    return repo.get_match_made(search_id)
