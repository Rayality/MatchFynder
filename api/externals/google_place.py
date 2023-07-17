import json
import requests
import os
from queries.generic_sql import generic_insert, generic_find
from queries.options import OptionIn, OptionRepository

GOOGLE_MAPS_API_KEY = os.environ["GOOGLE_MAPS_API_KEY"]


def create_from_request(json_dict):
    try:
        place_id = json_dict.get('place_id')
        option = generic_find("options", "google_place_id", place_id)
        if len(option) == 0:
            print("making new option")
            new_item = {}
            new_item["business_status"] = json_dict.get("business_status")
            new_item["name"] = json_dict.get("name")
            new_item["google_place_id"] = json_dict.get("place_id")
            new_item["formatted_address"] = json_dict.get("formatted_address")
            new_item["latitude"] = (
                json_dict.get("geometry", {}).get("location", {}).get("lat")
            )  # noqa
            new_item["longitude"] = (
                json_dict.get("geometry", {}).get("location", {}).get("lng")
            )  # noqa
            new_item["price_level"] = json_dict.get("price_level")
            new_item["rating"] = json_dict.get("rating")
            new_item["user_ratings_count"] = json_dict.get("user_ratings_total")  # noqa
            new_item["picture_url"] = json_dict.get("picture_url")
            option_in = OptionIn(**new_item)
            option = OptionRepository.create(OptionRepository, option_in)
        return option
    except Exception as e:
        print(e)
        return {"message": "error in update_create_from_request"}


def get_google_options(location, query="restaurants", radius=1500):
    try:
        params = {
            "query": query,
            "location": location,
            "radius": radius,
            "key": GOOGLE_MAPS_API_KEY,
        }
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
        response = requests.get(url, params=params)
        content = json.loads(response.content)
        output_list = []
        for item in content["results"]:
            try:
                photo_ref = item["photos"][0]["photo_reference"]
                photo_width = 400
                item["picture_url"] = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth={photo_width}&photo_reference={photo_ref}&key={GOOGLE_MAPS_API_KEY}"

            except (KeyError, IndexError):
                item["picture_url"] = None
            output_list.append(create_from_request(item)[0])
            print(output_list)
        return output_list
    except Exception as e:
        print(e)
        return {"message": "error in get_google_options"}
