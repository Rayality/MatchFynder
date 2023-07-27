import json
import requests
import os
from queries.generic_sql import generic_insert, generic_find
from queries.options import OptionIn, OptionRepository
from queries.pool import pool
from psycopg import sql
from psycopg.rows import dict_row

GOOGLE_MAPS_API_KEY = os.environ["GOOGLE_MAPS_API_KEY"]


def update_search_token(token, search_id):
    query = sql.SQL(
        "UPDATE search SET next_page_token = {t} WHERE id = {s} RETURNING *;"
    ).format(t=token, s=search_id)
    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as db:
                result = db.execute(query)
                return result
    except Exception as e:
        print("Encountered an error in the function 'update_search_token'")
        raise e


def create_from_request(json_dict):
    try:
        place_id = json_dict.get("place_id")
        option = generic_find("options", "google_place_id", place_id)
        if len(option) == 0:
            new_item = {}
            new_item["business_status"] = json_dict.get("business_status")
            new_item["name"] = json_dict.get("name")
            new_item["google_place_id"] = json_dict.get("place_id")
            new_item["formatted_address"] = json_dict.get("formatted_address")
            new_item["latitude"] = (
                json_dict.get("geometry", {}).get("location", {}).get("lat")
            )
            new_item["longitude"] = (
                json_dict.get("geometry", {}).get("location", {}).get("lng")
            )
            new_item["price_level"] = json_dict.get("price_level")
            new_item["rating"] = json_dict.get("rating")
            new_item["user_ratings_count"] = json_dict.get("user_ratings_total")
            new_item["picture_url"] = json_dict.get("picture_url")
            option_in = OptionIn(**new_item)
            option = OptionRepository.create(OptionRepository, option_in)
        return option
    except Exception as e:
        raise e


def get_google_options(location, search_id, query="restaurants", radius=1500):
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
        token = content.get("next_page_token")
        if token is None:
            token = "NA"
        update_search_token(token, search_id)
        output_list = []
        for item in content["results"]:
            try:
                photo_ref = item["photos"][0]["photo_reference"]
                photo_width = 400
                item[
                    "picture_url"
                ] = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth={photo_width}&photo_reference={photo_ref}&key={GOOGLE_MAPS_API_KEY}"  # noqa

            except (KeyError, IndexError):
                item["picture_url"] = None
            output_list.append(create_from_request(item)[0])
        return output_list
    except Exception as e:
        raise e


def get_place_details(place_id):
    photo_list = []
    url = "https://maps.googleapis.com/maps/api/place/details/json?"
    params = {"place_id": place_id, "key": GOOGLE_MAPS_API_KEY}
    response = requests.get(url, params=params)
    content = json.loads(response.content)
    content = content["result"]
    photo_info_list = content["photos"]
    for info in photo_info_list:
        photo_ref = info["photo_reference"]
        photo_width = 400
        photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth={photo_width}&photo_reference={photo_ref}&key={GOOGLE_MAPS_API_KEY}"  # noqa
        generic_insert(
            "place_pictures", {"picture_url": photo_url, "place_id": place_id}
        )
        photo_list.append(photo_url)
    content["photos"] = photo_list
    return content


def get_next_page(search_id):
    try:
        search = generic_find("search", "id", str(search_id))
        search = search[0]
        token = search["next_page_token"]
        if token != 1:
            url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"  # noqa
            params = {"pagetoken": token, "key": GOOGLE_MAPS_API_KEY}
            response = requests.get(url, params=params)
            content = json.loads(response.content)
            if content["status"] == "ZERO_RESULTS":
                print("ZERO_RESULTS returned for next page")
                return []
            new_token = content.get("next_page_token")
            if new_token is None:
                update_search_token("used", search_id)
            output_list = []
            for item in content["results"]:
                try:
                    photo_ref = item["photos"][0]["photo_reference"]
                    photo_width = 400
                    item[
                        "picture_url"
                    ] = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth={photo_width}&photo_reference={photo_ref}&key={GOOGLE_MAPS_API_KEY}"  # noqa

                except (KeyError, IndexError):
                    item["picture_url"] = None
                option = create_from_request(item)[0]
                generic_insert(
                    "search_options",
                    {"search_id": search_id, "option_id": option["id"]},
                )
                output_list.append(option)
            return output_list
    except Exception as e:
        print("function get_next_page encountered an error")
        raise e
