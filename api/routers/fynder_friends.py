from fastapi import APIRouter, Depends, Response, HTTPException, status
from auth.authenticator import authenticator
from queries.options import (
    OptionIn,
    OptionOut,
    OptionRepository,
    Error,
)
from typing import Union


router = APIRouter
