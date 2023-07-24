# Match Fynder

- Charles Cowan
- Kristen Lynch
- Jarrett Pitts
- Nicholas Tomasso

Match Fynder: Matching groups to a nearby restaurant

## Intended market

-People who want to eat food from a restaurant
-People who've struggled to agree on where to eat

## Functionality

--Site includes a Main page and About Page with company info and FAQ. The Account setup/login modals are accessible from either page.
--Visitors to the site can set up an account which allows them to create a new search.
--Searches involve entering a location (zipcode OR city, state) and inviting participants (other account holders or simply people with an email address)
--Once a search is created, it is populated via options from the Fynder database and google maps API
--Every search participant can engage in approving (or vetoing) options. Participants can click on links to each restaurant's web page to learn more.
--Once every participant has approved any particular option, all participants have access to the 'Match Made' page
--Participants earn fun 'badges' based upon their engagement in the search (eg: "picky eater" (most vetos) "decisive devourer" (fastest) "fastidious feaster" (most research) "giddy gastronomer" (most approvals))

## Design

- Wire-frame diagrams
- Data Model
- API documentation

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

- `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
- `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to CapRover. We will learn much more about this file.
- `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.
- `.env.sample`: This file is a template to copy when
  creating environment variables for your team. Create a
  copy called `.env` and put your own passwords in here
  without fear of it being committed to git (see `.env`
  listed in `.gitignore`). You can also put team related
  environment variables in here, things like api and signing
  keys that shouldn't be committed; these should be
  duplicated in your deployed environments.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

- make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
- remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

- add these GitLab CI/CD variables:
  - PUBLIC_URL : this is your gitlab pages URL
  - REACT_APP_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Initialize CapRover

1. Attain IP address and domain from an instructor
1. Follow the steps in the CD Cookbook in Learn.

### Update GitLab CI/CD variables

Copy the service URL for your CapRover service and then paste
that into the value for the REACT_APP_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.
