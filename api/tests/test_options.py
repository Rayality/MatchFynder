from fastapi.testclient import TestClient
from main import app
from queries.options import OptionRepository

client = TestClient(app)


class EmptyOptionQueries:
    def get_options(self):
        return []


def test_get_all_options():
    # Setup
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[OptionRepository] = EmptyOptionQueries
    # Enact
    response = client.get("/options")
    # Assert
    assert response.status_code == 200
    assert response.json() == []
    # Teardown
    app.dependency_overrides = {}


class CreateQueries:
    def create(self, option):
        result = {
            "id": 12345,
            "created_on": "2023-07-18T20:19:41.935306",
            "updated_on": "2023-07-18T20:19:41.935306",
        }
        result.update(option)
        return result


def test_create_option():
    # Setup
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    app.dependency_overrides[OptionRepository] = CreateQueries
    json = {
        "business_status": "OPERATIONAL",
        "name": "RestaurantOption",
        "picture_url": "string",
        "google_place_id": "A123BCD",
        "formatted_address": "123 A Road, City, ST, 00000",
        "latitude": 123,
        "longitude": 456,
        "price_level": 1,
        "rating": 5,
        "user_ratings_count": 100,
    }
    expected = {
        "id": 12345,
        "business_status": "OPERATIONAL",
        "name": "RestaurantOption",
        "picture_url": "string",
        "google_place_id": "A123BCD",
        "formatted_address": "123 A Road, City, ST, 00000",
        "latitude": 123,
        "longitude": 456,
        "price_level": 1,
        "rating": 5,
        "user_ratings_count": 100,
        "created_on": "2023-07-18T20:19:41.935306",
        "updated_on": "2023-07-18T20:19:41.935306",
    }
    # Enact
    response = client.post("/options", json=json)

    # Assert
    assert response.status_code == 200
    assert response.json() == expected

    # Teardown
    app.dependency_overrides = {}
