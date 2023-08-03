--The date of the entry
--A list of features/issues that you worked on and who you worked with, if --applicable
--A reflection on any design conversations that you had
--At least one ah-ha! moment that you had during your coding, however small

## 6/26/2023

created P0 issues as a group with Kristen "driving"

## 6/27/2023

created each database table as a migration file.
updated docker files with the postgres db commands.
changed docker.dev file in api folder and edited docker compose files.
fixed issue of psycopg_pool module not found.

## 6/28/2023

started building function components to expedite database interactions.
aha - npm modules get stored in the package.json when installed.


## 6/29-30/2023

--created search repo and functions. Totalling 7 functions and
    endpoints to process data between tables.

## 7/10/2023

--created google API query endpoints and functions
--created a generic find function to simplify future database queries

## 7/11/2023

--researched location functionality/implementation on the front-end
--started the landing page for a "match made" in a search
-aha- docker compose up, also builds

## 7/12/2023
--implemented more api functionality and progressed match made page

## 7/13-14/2023
-- worked on match made page layout and interactions

## 7/17-21/2023
-- made sql table changes to facilitate api calls
-- worked with modules for interactive sliders
-- struggled with layouts
-- furthered knowledge of html/css layouts
-- completed match made page and all additional components except badge cards
-- created additional api endpoints and functionality
-- created a button/link to get directions to the place.
    (will display a map in the future)
## 7/24/2023
-- made the buttons on the match made page functional
    -- redirects to directions for the matched place
    -- displays overlay for additional information

## 7/25/2023
--added a column to the "search" table in sql to hold the
    google api response code for more options.
-- added the functionality to get more related places from google,
-- added the functionality to get more detailed information about a place
    (want to store this in a mongodb in the future)

## 7/26/2023
-- Implemented an autocomplete search bar for the location
    using redux/google_api. Working on a way to autofill if an option wasn't selected

## 7/27/2023
-- Tag-teamed 'lint' issues all morning and did deployment troublehsooting all evening

## 7/28/2023
-- fixed issue with not displaying a default photo, if no option image was present.
-- More time troubleshooting deployment problems.
-- had to restore local variables to be functionally correct for development.
-- created 2 unit tests for places_api
-- created 'friends' table
    - created 'FynderFriends' repo with add function and...
        a get-all-friends function for a specific user
    - created router endpoints for the above repo (tested and working)

## 7/31/2023
-- fixed cors issue on the deployed page with gitlab and galvanize cloud
-- remade migrations folder in fast api
-- implemented a directions map on the match made page instead of redirecting to google
    still working on displaying the route

## 8/01/2023
-- We got help with deploying pg-admin to galvanize cloud
-- Worked through multiple issues on deploying with
    gitlab pages and galvanize cloud
