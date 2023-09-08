from pydantic import BaseModel
from .pool import pool


class AccountOut(BaseModel):
    id: str
    username: str
    email: str
    first_name: str
    last_name: str


class HashedAccountOut(AccountOut):
    hashed_password: str


class AccountIn(BaseModel):
    username: str
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    password: str


class AccountRepo(BaseModel):
    def get(self, username: str) -> HashedAccountOut:
        with pool.connection() as conn:
            cur = conn.execute(
                """
                SELECT id
                     , username
                     , email
                     , first_name
                     , last_name
                     , hashed_password
                FROM finder
                WHERE username = %s
                """,
                [username],
            )
            record = cur.fetchone()
            user = self.create_hashed_account_from_record(record)
        return user

    def create(
        self,
        info: AccountIn,
        hashed_password: str,
    ) -> HashedAccountOut:
        with pool.connection() as conn:
            cur = conn.execute(
                """
                INSERT INTO finder (
                    username,
                    email,
                    first_name,
                    last_name,
                    hashed_password
                )
                VALUES (%s,%s,%s,%s,%s)
                RETURNING id;
                """,
                (
                    info.username,
                    info.email,
                    info.first_name,
                    info.last_name,
                    hashed_password,
                ),
            )
            id = cur.fetchone()[0]
            account_data = info.dict()
            account_data.pop("password")
            return AccountOut(id=id, **account_data)

    def create_hashed_account_from_record(self, record):
        user = HashedAccountOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            username=record[4],
            hashed_password=record[5],
        )
        return user

    def get_account_from_token(self, token):
        with pool.conection() as conn:
            cur = conn.execute(
                """
                SELECT id
                     , username
                     , email
                     , first_name
                     , last_name
                     , hashed_password
                FROM finder
                WHERE hashed_password = %s
                """,
                [token],
            )
            record = cur.fetchone()
            user = self.create_hashed_account_from_record(record)
            return user


class DuplicateAccountError(BaseException):
    pass
