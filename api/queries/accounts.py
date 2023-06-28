from pydantic import BaseModel


class AccountOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    username: str


class HashedAccountOut(AccountOut):
    hashed_password: str


class AccountIn(BaseModel):
    username: str
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    hashed_password: str
    disabled: bool | None = None


class AccountRepo(BaseModel):
    def get(self, email: str) -> HashedAccountOut:
        return ()

    def create(
        self,
        info: AccountIn,
        hashed_password: str,
    ) -> HashedAccountOut:
        return ()


class DuplicateAccountError(BaseModel):
    pass
