import os
from fastapi import Depends, Cookie
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountRepo, AccountOut, HashedAccountOut
from typing import Optional
from fastapi.security import OAuth2PasswordBearer


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
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: HashedAccountOut):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, AccountOut(**account.dict())

    # async def try_get_current_account_data(
    #     self,
    #     bearer_token: Optional[str] = Depends(OAuth2PasswordBearer("token")),
    #     cookie_token: Optional[str] = (Cookie(default=None, alias="fastapi_token")),
    # ) -> dict:
    #     account = {}
    #     return account

    # async def get_current_account_data(
    #     self,
    #     account: dict = Depends(try_get_current_account_data),
    # ) -> dict:
    #     return account


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
