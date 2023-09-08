# APIs

## Option

- **Method**: `POST`, `GET`, `PUT`, `DELETE`,
- **Path**: `/options`, `/options/<int:pk>`

Input:

```json
{
    "business_status": Optional[str],
    "name": str,
    "picture_url": Optional[str],
    "google_place_id": Optional[str],
    "formatted_address": Optional[str],
    "latitude": Optional[float],
    "longitude": Optional[float],
    "price_level": Optional[int],
    "rating": Optional[float],
    "user_ratings_count": Optional[float]
}
```

Output:

```json
{
    "id": int,
    "business_status": Optional[str],
    "name": str,
    "picture_url": Optional[str],
    "google_place_id": Optional[str],
    "formatted_address": Optional[str],
    "latitude": Optional[float],
    "longitude": Optional[float],
    "price_level": Optional[int],
    "rating": Optional[float],
    "user_ratings_count": Optional[float],
    "created_on": datetime,
    "updated_on": datetime
}
```

Creating a new option adds a new option to the fynder database which can be added to searches by a user.

## Search

- **Method**: `GET`, `POST`, `PUT`, `DELETE`,
- **Path**: `/search/create`, `/search/<int:pk>/finders`, `/search/<int:pk>/options`, `/search/<int:pk>/options/<int:pk>`, `/search/<int:pk>/match_made/`,
  `/search/<int:pk>/options/next`

Input:

```json
{
  "owner": int
}
```

Output:

```json
{
    "id": int,
    "owner": int,
    "participant_count": int,
    "match_made": bool,
    "created_on": datetime,
    "updated_on": datetime
}
```

Creating a new search triggers a record created in the search table with a participant count of 1 and match_made set to false.

Creating records in the search_finders table associates users with searces.

Creating records in the search_options table associates options from the finder options table with specific searches.

Updating the edible_count of a record in the search_options table increments the count of users who have approved a given option

Updating the match_made attribute of a record to true enables a search to resolve

Getting the next page of options creates new records in the search_options table associating more options from the finder options table with specific searches.

## Places_API

- **Method**: `GET`
- **Path**: `/query/zipcode`, `/query/city`, `/place/details`

Input:

```json
{
  "zipcode": int,
  "search_id": int
}
```

Output:

```json
{
    "id": int,
    "business_status": Optional[str],
    "name": str,
    "picture_url": Optional[str],
    "google_place_id": Optional[str],
    "formatted_address": Optional[str],
    "latitude": Optional[float],
    "longitude": Optional[float],
    "price_level": Optional[int],
    "rating": Optional[float],
    "user_ratings_count": Optional[float],
    "created_on": datetime,
    "updated_on": datetime
}
```

Searching from zipcode will accept a zipcode as an input, convert it to latitude/longitude using a python-based library called pgeocode (https://pypi.org/project/pgeocode/), and make a google api query using that lat/long to get 20 restaurant options. It will then update or create options records for those records, and associate the records with the search_id passed in.

Searching from city will accept a city and a state as an input, convert t to latitude/longitude using a python-based library called pgeocode (https://pypi.org/project/pgeocode/), and make a google api query using that lat/long to get 20 restaurant options. It will then update or create options records for those records, and associate the records with the search_id passed in.

Place details accepts a google place_id as an input and queries google api to get details about that place, returning the data in the result.

## Accounts

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Path: `/api/accounts`, `/api/accounts/<int:pk>`

Input:

```json
{
  "username": str,
  "email": string,
  "first_name": string,
  "last_name": string
}
```

Output:

```json
{
  "id": str,
  "username": str,
  "email": string,
  "first_name": string,
  "last_name": string
}
```

The Accounts API creates, updates, or deletes an account for a user on the matchfynder website.
