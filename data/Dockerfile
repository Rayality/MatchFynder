FROM postgres:15.3-bullseye
COPY finder.sql /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*
