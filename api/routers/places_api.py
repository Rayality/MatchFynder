from fastapi import APIRouter, Depends, Response
from queries.options import Error, OptionOut
from queries.places_api import PlacesRepository
from typing import Union, Optional

router = APIRouter()


@router.get("/query/latlong", response_model=Union[Optional[Error], Optional[list[OptionOut]]])
def get_google_options_zipcode(latlong, search_id, response: Response, repo: PlacesRepository = Depends()):
    return repo.search_from_zipcode(latlong, search_id)


@router.get("/query/city", response_model=Union[Optional[Error], Optional[list[OptionOut]]])
def get_google_options_city(city: str, state: str, response: Response, repo: PlacesRepository = Depends()):
    return repo.search_from_city(city, state)


@router.get("/place/details/")
def get_google_place_details(place_id: str, repo: PlacesRepository = Depends()):
    return repo.place_details(place_id)
