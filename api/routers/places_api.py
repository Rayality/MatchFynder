from fastapi import APIRouter, Depends, Response, HTTPException, status
from queries.options import Error, OptionOut
from queries.places_api import PlacesRepository
from typing import Union, Optional
from auth.authenticator import authenticator

router = APIRouter()

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.get(
    "/query/latlong",
    response_model=Union[Optional[Error], Optional[list[OptionOut]]],
)
def get_google_options_zipcode(
    latlong,
    search_id,
    response: Response,
    repo: PlacesRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.search_from_zipcode(latlong, search_id)
    else:
        raise not_authorized


@router.get(
    "/query/city",
    response_model=Union[Optional[Error], Optional[list[OptionOut]]],
)
def get_google_options_city(
    city: str,
    state: str,
    response: Response,
    repo: PlacesRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.search_from_city(city, state)
    else:
        raise not_authorized


@router.get("/place/details/")
def get_google_place_details(place_id: str, repo: PlacesRepository = Depends()):
    return repo.place_details(place_id)
