# Copy node form the frontend
FROM node:21 as frontend

# Add sources into /app/
WORKDIR /app/frontend/
ADD frontend /app/frontend/

RUN yarn
RUN yarn build

# Start the nginx container
FROM python:3.8-alpine

# Install binary python dependencies
RUN apk add --no-cache \
    build-base \
    mailcap \
    libxslt-dev \
    linux-headers \
    pcre-dev \
    python3-dev

# Add requirements and install dependencies
ADD requirements.txt /app/
ADD requirements-prod.txt /app/
WORKDIR /app/

# Add the entrypoint and add configuration
RUN mkdir -p /var/www/static/ \
    && pip install -r requirements.txt \
    && pip install -r requirements-prod.txt

# Install Django App, configure settings and copy over djano app
ADD manage.py /app/
ADD static/ /app/static/
ADD datasets/ /app/datasets/
ADD mathdb/ /app/mathdb/
ADD docker/ /app/docker/

COPY --from=frontend /app/frontend/build/ /app/frontend/build/

ENV DJANGO_SETTINGS_MODULE "mathdb.docker_settings"

### ALL THE CONFIGURATION

# The secret key used for django
ENV DJANGO_SECRET_KEY ""

# A comma-seperated list of allowed hosts
ENV DJANGO_ALLOWED_HOSTS "localhost"

# Database settings
## Use SQLITE out of the box
ENV DJANGO_DB_ENGINE "django.db.backends.sqlite3"
ENV DJANGO_DB_NAME "/data/mathdb.db"
ENV DJANGO_DB_USER ""
ENV DJANGO_DB_PASSWORD ""
ENV DJANG_DB_HOST ""
ENV DJANGO_DB_PORT ""

# Volume and ports
VOLUME /data/
EXPOSE 80

RUN DJANGO_SECRET_KEY=build python manage.py collectstatic
ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["uwsgi", "--ini", "/app/docker/uwsgi.ini"]