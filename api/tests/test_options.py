from fastapi.testclient import TestClient
from main import app
from queries import OptionRepository

client = TestClient(app)


class EmptyOptionQueries:
    def get_options(self):
        return []


def test_get_all_options():
    # Setup
    app.dependency_overrides[OptionRepository] = EmptyOptionQueries
    # Enact
    response = client.get("/options")
    # Assert
    assert response.status_code == 200
    assert response.json() == []
    # Teardown
    app.dependency_overrides = {}


class CreateQueries:
    def create_option(self, option):
        result = {
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
        result.update(option)
        return result
