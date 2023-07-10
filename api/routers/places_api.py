from fastapi import APIRouter, Depends, Response
from queries.options import Error
from typing import Union

router = APIRouter()


@router.post("/query/zipcode")
def
