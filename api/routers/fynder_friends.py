from fastapi import APIRouter, Depends, Response, HTTPException, status
from auth.authenticator import authenticator
from queries.search import (
    SearchRepository,
)
from queries.fynder_friends import FynderRepository


router = APIRouter()
not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.post("search/{search_id}/include")
def include_in_search(
    search_id: int,
    repo: SearchRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        account_id = account_data.get("id")
        try:
            # adds this user to this search participant table
            repo.add_search_finder(account_id, search_id)
        except Exception:
            pass

    else:
        raise not_authorized


@router.post("/friends/{owner}/add/")
def add_friend(
    owner: int,
    friend_id: int,
    repo: FynderRepository = Depends(),
):
    return repo.add_friend(owner, friend_id)


@router.get("/friends/{owner}")
def get_friends(owner: int, repo: FynderRepository = Depends()):
    return repo.get_friends(owner)
