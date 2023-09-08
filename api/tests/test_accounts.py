from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepo, HashedAccountOut, AccountIn

client = TestClient(app)


class EmptyAccountQueries:
    def get_account(self):
        return []

    def dummy_hashed_out(self):
        return None


class CreateQueries:
    def create(self, info, hashed_password):
        account_data = info.dict()
        account_data["hashed_password"] = hashed_password
        account_data.pop("password")
        return HashedAccountOut(id=1, **account_data)

    def get(self, username):
        account = {
            "username": username,
            "email": "KDawg@JDawg.CDawg",
            "first_name": "Kristen",
            "last_name": "Dawg",
            "password": "WhoLetTheDawgsOut",
        }
        user = self.create(
            AccountIn(**account),
            "$2b$12$nRq7ZV8Y9ct/HwlCqGASnO6EYcV54MreKav6NVBu5gGy3LP2p3EKK",  # noqa
        )
        return user


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
        "id": "1",
        "username": "KDawg",
        "email": "KDawg@JDawg.CDawg",
        "first_name": "Kristen",
        "last_name": "Dawg",
    }

    response = client.post("/api/accounts", json=json)

    assert response.status_code == 200
    assert response.json()["account"] == expected

    app.dependency_overrides = {}
