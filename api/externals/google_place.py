import json
import requests
import os

GOOGLE_MAPS_API_KEY = os.environ["GOOGLE_MAPS_API_KEY"]


def get_google_options(query= "restaurants", location, radius=1500):
    params = {
        "query": query,
        "location": location,
        "radius": radius,
        "key": GOOGLE_MAPS_API_KEY,
    }
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
    response = requests.get(url, params=params)
    content = json.loads(response.content)

    for item in content["results"]:
        try:
            photo_ref = item["photos"][0]["photo_reference"]
            photo_width = 400
            item["picture_url"] = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth={photo_width}&photo_reference={photo_ref}&key={GOOGLE_MAPS_API_KEY}"

        except (KeyError, IndexError):
            item["picture_url"] = None

    try:
        return content["results"]
    except (KeyError, IndexError):
        return None
