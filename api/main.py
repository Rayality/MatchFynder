from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.authenticator import authenticator
from routers import options, search, accounts, places_api
from socks import search_socket
import os

# from externals import send_mail

app = FastAPI()
app.include_router(options.router)
app.include_router(search.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(search.router)
app.include_router(search_socket.router)
# app.include_router(send_mail.router)
app.include_router(places_api.router)

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
    "https://incognitoincredibles.gitlab.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    # account_data: dict = Depends(authenticator.get_current_account_data)
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
