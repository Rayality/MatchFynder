from pgeocode import Nominatim
from .generic_sql import generic_insert
from pydantic import BaseModel
from typing import Optional
from externals.google_place import get_google_options


class PlacesRepository:
    # I coded the country code variable to remind us that we could
    #     dynamically get the country code in the future.
    country_code = "US"
    geo = Nominatim(country_code)

    def search_from_zipcode(self, zip: int):
        zipcode_info = geo.query_postal_code(zip)
        location_string = f"{zipcode_info["latitude"]}, {zipcode_info["longitude"]}"
        try:
            results = get_google_options(location=location_string)
        except Exception as e:
            results = {"message": f"{e}"}
        return results


    def search_from_city(self, city: str, state: str):
    # The query gets all cities with the input name
        cities_dataframe = geo.query_location(city)
    # The filt variable is creating a dataframe filter using the state input
        filt = (cities_dataframe["state_name"] == state)
    # Then we apply our filter and we added an additional list of columns that we wanted
        lats_longs = cities_dataframe.loc[filt, ["latitude", "longitude"]]
    # "records" is a built in arguement that returns a List of Objects/Dictionaries
    #    with the column name as a key for the value, and each row is a separate Obj/Dict
    #   [
    #    {'latitude': 52.4043, 'longitude': -43.5243},
    #    {'latitude': 52.8508, 'longitude': -42.5114}
    #   ]
        latlong_list = lats_longs.to_dict("records")
    # The code below is to get the mean of the latitudes and longitudes.
    #   This is optional but the result distances can vary up to a degree.
    #   Previously it could send a group 30 miles to the result area.
    #   Now it is effectively searching the center area of all the results.
        latitudes = 0.0
        longitudes = 0.0
        for result in latlong_list:
            latitudes += result["latitude"]
            longitudes += result["longitude"]
        latitude_mean = round(latitudes / len(lats_longs), 4)
        longitude_mean = round(longitudes / len(lats_longs), 4)
        location_string = f"{latitude_mean}, {longitude_mean}"
        try:
            results = get_google_options(location=location_string)
        except Exception as e:
            results = {"message": f"{e}"}
        return results
