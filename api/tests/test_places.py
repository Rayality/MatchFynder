from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepo, AccountOut
from auth.authenticator import authenticator


client = TestClient(app)


class EmptyAccountQueries:
    def get_account(self):
        return []


class CreateQueries:
    def create(self, option):
        result = {
            "created_on": "2023-07-18T20:19:41.935306",
            "updated_on": "2023-07-18T20:19:41.935306",
        }
        result.update(option)
        return result


def test_create_account():
    app.dependency_overrides[AccountRepo] = CreateQueries
    json = {
        "username": "KDawg",
        "email": "KDawg@JDawg.CDawg",
        "first_name": "Kristen",
        "last_name": "Dawg",
        "password": "WhoLetTheDawgsOut",
    }
    expected = {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlY2I1N2NhOC03MTk3LTRkOWUtYWM3ZS00M2VmYzBkZDczY2EiLCJleHAiOjE2OTA1NTY5NzgsInN1YiI6IkRhd2ciLCJhY2NvdW50Ijp7ImlkIjoiMyIsInVzZXJuYW1lIjoiRGF3ZyIsImVtYWlsIjoiS3Jpc3RlbiIsImZpcnN0X25hbWUiOiJLRGF3ZyIsImxhc3RfbmFtZSI6IktEYXdnQEpEYXdnLkNEYXdnIn19.bv8NpddQbRU4sXcID5aAyNEm6O8Dbuh1-6t75AQJGUo",
        "token_type": "Bearer",
        "account": {
            "id": "3",
            "username": "KDawg",
            "email": "KDawg@JDawg.CDawg",
            "first_name": "Kristen",
            "last_name": "Dawg",
        },
    }
    response = client.post("/api/accounts", json=json)

    assert response.status_code == 200
    assert response.json == expected

    app.dependency_overrides = {}
