import os
from fastapi import Depends, Cookie, status, HTTPException
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountRepo, AccountOut, HashedAccountOut
from typing import Optional
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

SECRET_KEY = os.environ.get("SIGNING_KEY")


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountRepo,
    ) -> AccountOut:
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountRepo = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: HashedAccountOut):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, AccountOut(**account.dict())

    async def try_get_current_account_data(
        self,
        account: AccountOut,
        bearer_token: Optional[str] = Depends(OAuth2PasswordBearer("token")),
        cookie_token: Optional[str] = (
            Cookie(
                default=None,
                alias="fastapi_token",
            )
        ),
    ) -> dict:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            if bearer_token is not None:
                payload = jwt.decode(bearer_token, SECRET_KEY)
                password = payload.get("sub")
            else:
                payload = jwt.decode(cookie_token, SECRET_KEY)
                password = payload.get("sub")
            if password is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        user = AccountOut(**payload.get("account"))
        print(user.dict())
        if user is None:
            raise credentials_exception
        return user

    async def get_current_account_data(
        self,
        account: dict = Depends(try_get_current_account_data),
    ) -> dict:
        return account


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
