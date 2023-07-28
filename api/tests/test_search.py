from fastapi.testclient import TestClient
from main import app
from queries.search import SearchRepository
from auth.authenticator import authenticator
from pydantic import BaseModel

client = TestClient(app)


class EmptySearchQueries:
    def get_searches(self):
        return []


class AccountOut(BaseModel):
    id: str
    username: str
    email: str
    first_name: str
    last_name: str


def fake_get_current_account_data():
    return AccountOut(
        id="JP", username="JP", email="JP", first_name="JP", last_name="JP"
    )


def test_get_all_searches():
    # Setup the dependency injection to override empty search query database
    app.dependency_overrides[SearchRepository] = EmptySearchQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    # Act ?
    response = client.get("/search/")
    # Assert
    assert response.status_code == 200
    assert response.json() == []
    # Teardown
    app.dependecy_overrides = {}


class MatchMadeQuery:
    def get_match_made(self, search_id: int):
        return {"match_made": True}


def test_get_match_made():
    # Setup the dependency injection
    app.dependency_overrides[SearchRepository] = MatchMadeQuery
    search_id = 123
    # Act ?
    response = client.get(f"/search/{search_id}/match_made")
    # Assert
    assert response.status_code == 200
    assert response.json() == {"match_made": True}
    # Teardown
    app.dependency_overrides = {}
