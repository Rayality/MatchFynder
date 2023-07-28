from fastapi.testclient import TestClient
from main import app
from queries.places_api import PlacesRepository
from auth.authenticator import authenticator
from queries.accounts import AccountOut

client = TestClient(app)


def fake_get_current_account_data():
    return AccountOut(
        id="1",
        username="KDawg",
        email="kdawg@gmail.com",
        first_name="K",
        last_name="Dawg",
    )


class CreateQueries:
    def search_from_city(self, city, state):
        return []


def test_get_options_by_city():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[PlacesRepository] = CreateQueries
    response = client.get(
        "/query/city?city=Coventry&state=RI",
    )
    # Assert
    assert response.status_code == 200
    assert response.json() == []
    # Teardown
    app.dependency_overrides = {}
