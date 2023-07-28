from fastapi.testclient import TestClient
from main import app
from queries.places_api import PlacesRepository
from auth.authenticator import authenticator
from queries.accounts import AccountOut
from queries.options import OptionOut
from datetime import datetime

client = TestClient(app)

user = AccountOut(
    id="user",
    username="user",
    email="user@user.com",
    first_name="user",
    last_name="user",
)

option = {
    "id": 1,
    "business_status": "opt",
    "name": "str",
    "picture_url": "Optional[str]",
    "google_place_id": "Optional[str]",
    "formatted_address": "str",
    "latitude": 123.0,
    "longitude": 123.0,
    "price_level": 1,
    "rating": 1.0,
    "user_ratings_count": 1.0,
    "created_on": "2023-07-18T20:19:41.935306",
    "updated_on": "2023-07-18T20:19:41.935306",
}


def fake_get_current_account_data():
    return user


class TestingPlaces:
    def search_from_zipcode(self, latlong, search_id):
        out = [option]
        return out

    def place_details(self, place_id):
        output = {"details": place_id}
        return output

def test_get_google_options_zipicode():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PlacesRepository] = TestingPlaces

    # Enact
    result = client.get("/query/latlong?latlong=string&search_id=number")

    # Assert
    assert result.status_code == 200
    assert result.json() == [option]

    # Teardown
    app.dependency_overrides = {}


def test_get_place_details():
    # Arrange
    app.dependency_overrides[PlacesRepository] = TestingPlaces

    # Enact
    result = client.get("/place/details?place_id=string")

    # Assert
    assert result.status_code == 200
    assert result.json() == {"details": "string"}

    # Teardown
    app.dependency_overrides = {}
