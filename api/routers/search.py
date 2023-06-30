from fastapi import APIRouter, Depends, Response
from queries.search import (
    Search,
    SearchOut,
    SearchFinders,
    SearchOptions,
    SearchRepository
)
from queries.options import Error
from typing import Union

router = APIRouter()


@router.get(
        "/search/{search_id}/options",
        response_model=Union[Error, list[SearchOptions]]
)
def get_search_options(search_id: int, response: Response, repo: SearchRepository = Depends()):
    return repo.


@router.get(
    "/search/{search_id}/finders",
    response_model=Union[Error, list[SearchFinders]]
)
def get_search_finders(search_id: int, response: Response, repo: SearchRepository = Depends()):
    return repo.get_search_finders()


@router.post("/search/create", response_model=Union[Error, SearchOut])
def create_search(search: Search, response: Response, repo: SearchRepository = Depends()):
    return repo.create_search(search)
