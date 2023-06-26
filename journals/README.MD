## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.


## postgres info

FIRST STEP: before compose up, remember to run the following cmd
# docker volume create postgres-data

Any classes you write that talk to postgres will need to use the DATABASE_URL environment variable to create a connection.

<!-- # ./api/queries/accounts.py
import os
from psycopg_pool import ConnectionPool
pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL")) -->
