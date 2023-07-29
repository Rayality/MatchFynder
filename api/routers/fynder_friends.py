from fastapi import APIRouter, Depends, Response, HTTPException, status
from auth.authenticator import authenticator
from queries.options import (
    OptionIn,
    OptionOut,
    OptionRepository,
    Error,
)
from typing import Union
from queries.fynder_friends import FynderRepository


router = APIRouter()


@router.post("/friends/{owner}/add/")
def add_friend(
    owner: int,
    friend_id: int,
    response: Response,
    repo: FynderRepository = Depends(),
):
    return repo.add_friend(owner, friend_id)


@router.get("/friends/{owner}")
def get_friends(owner: int, repo: FynderRepository = Depends()):
    return repo.get_friends(owner)
