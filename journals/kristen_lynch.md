--The date of the entry
--A list of features/issues that you worked on and who you worked with, if --applicable
--A reflection on any design conversations that you had
--At least one ah-ha! moment that you had during your coding, however small

## 7/20/2023

--lots of CSS improvements
--aha: play button in vscode!
--aha: highlight and parenthesis/curly brackets/braces add them to either end of highlight!!

## 7/19/2023

--reviewed project requirements as a team
--updated ReadMe
--Built Home page

## 7/18/2023

--refactored search frontend to be cleaner
--changed redirect from /options (which is an endpoint for all options) to /search/${search_id}/options (which is an endpoint for just those options associated with search_id)
--started unit tests for options

## 7/17/2023

--refactored all fastAPI endpoints to be cleaner
--added code comments for clarity

## 7/14/2023

-- updated generic sql insert to return all fields so that all default updated fields are returned and match data validation.
-- finished testing updates to updated at.

## 7/13/2023

-- Aha! getLazyQuery enables you to trigger the request manually
--connected front end to be able to get oiptions from google api and create a new search when the user enters a zip code.
-- tested updates to updated_at

## 7/12/2023

- Read documentation on RTK queries in an attempt to knit together our frontend and back end.
  -- Got stuck on figuring out how to trigger a .query GET request in response to user action in the UI

## 7/11/2023

- investigated TRIGGERS to be able to update the updated_at field in our data set for PUT requests automatically
- simplified/refactored our BaseModels for search to take advantage of default fields
  -learned from NT that docker compose up also builds the images

## 7/10/2023

--demos as a team
--refactor options frontend to use redux
--Aha: using tags to update particular data is SUPER useful
--started work on search

## 6/30/2023

--demos as a team: options endpoints, generic way to insert data into tables, login/out
--set up pgadmin
--

## 6/29/2023

--learned that npm install executed inside terminal also adds dependencies within package.json
--merge request complete and launched for frontend

## 6/28/2023

--transfered front end from old project to new and tested.
--found dependency on building out GET options

## 6/27/2023

--worked on a basic version of the front end for the option selection page based upon Figma designs from NT
--researched and selected a swipe module to support swipe selection functionality

## 6/26/2023

--created P0 issues in gitlab as a group with KL facilitating
--updated docker-compose, and dockerfile.dev with CC facilitating
