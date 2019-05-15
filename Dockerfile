# Copy node form the frontend
FROM node as frontend

# Add sources into /app/
WORKDIR /app/frontend/
ADD frontend .

RUN yarn && yarn build

# Start the nginx container
FROM python:3.6-alpine

# Install nginx and configuration
RUN apk add --no-cache nginx \
    && mkdir -p /run/nginx/
ADD docker/django.conf /etc/nginx/django.conf

# Add requirements and install dependencies
ADD requirements.txt /app/
WORKDIR /app/

# Add the entrypoint and add configuration
RUN mkdir -p /var/www/static/ \
    && pip install -r requirements.txt \
    && pip install gunicorn==19.7

# /entrypoint.sh
ADD docker/entrypoint.sh /entrypoint.sh

# Install Django App, configure settings and copy over djano app
ADD manage.py /app/
ADD datasets/ /app/datasets/
ADD mathdb/ /app/mathdb/
COPY --from=frontend /app/static/frontend /app/static/frontend

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

ENTRYPOINT ["/entrypoint.sh"]