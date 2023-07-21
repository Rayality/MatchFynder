from pgeocode import Nominatim
from typing import Optional, Union
from .options import OptionOut, Error
from externals.google_place import get_google_options, get_place_details
from .search import SearchRepository


class PlacesRepository:
    country_code = "US"
    geo = Nominatim(country_code)

    def search_from_zipcode(self, zip, search_id) -> Union[Optional[Error], Optional[OptionOut]]:
        try:
            zipcode_info = self.geo.query_postal_code(zip)
            lat = zipcode_info["latitude"]
            long = zipcode_info["longitude"]
            location_string = f"{lat}, {long}"
            results = get_google_options(location=location_string)
            for option in results:
                SearchRepository.add_search_option(self, search_id, option['id'])
            return results
        except Exception as e:
            print(e)
            return {"message": "error in search_from_zipcode"}

    def search_from_city(self, city: str, state: str):
        try:
            cities_dataframe = self.geo.query_location(city)
            filt = (cities_dataframe["state_name"] == state)
            lats_longs = cities_dataframe.loc[filt, ["latitude", "longitude"]]
            latlong_list = lats_longs.to_dict("records")
            latitudes = 0.0
            longitudes = 0.0
            for result in latlong_list:
                latitudes += result["latitude"]
                longitudes += result["longitude"]
            latitude_mean = round(latitudes / len(lats_longs), 4)
            longitude_mean = round(longitudes / len(lats_longs), 4)
            location_string = f"{latitude_mean}, {longitude_mean}"
            results = get_google_options(location=location_string)
            return results
        except Exception as e:
            print(e)
            return {"message": "error in search_from_city"}

    def place_details(self, place_id):
        try:
            result = get_place_details(place_id)
            return result
        except Exception as e:
            print(e)
            return {"message": "error in getting place_details"}
