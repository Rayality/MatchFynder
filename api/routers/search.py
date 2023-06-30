from fastapi import APIRouter, Depends, Response
from queries.search import (
    SearchIn,
    SearchOut,
    SearchRepository,
    Error
)
from typing import Union

router = APIRouter()


@router.post("/search", response_model=Union[SearchOut, Error])
def create_search(
    search: SearchIn,
    response: Response,
    repo: SearchRepository = Depends()
):
    response.status_code = 200
    return repo.create(search)


@router.get("/searches", response_model=Union[Error, list[SearchOut]])
def get_searches(
    response: Response,
    repo: SearchRepository = Depends(),
):
    response.status_code = 200
    return repo.get_searches()
