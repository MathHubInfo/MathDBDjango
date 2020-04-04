# MathDB Django
[![Build Status](https://travis-ci.com/MathHubInfo/MathDBDjango.svg?branch=master)](https://travis-ci.com/MathHubInfo/MathDBDjango)

A new MathDB Django Backend

## Installing

The entire application can be run locally for a development setup and via [Docker](https://www.docker.com/) in production. 

### Local Development Instance

To run a local instance, first install Python 3.6 or newer, then clone this repository and afterwards set up a [virtual environment](https://docs.python.org/3/library/venv.html) as follows:

```bash
# Create and activate venv in venv/ 
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate
```

Next, you will have to build the frontend, which is written in Javascript using React. 
It can be found in the frontend/ folder and can be compiled via:

```bash
# cd into the frontend directory
cd frontend

# install dependencies
yarn

# build it
yarn build
```

A local django instance is configured to store data in a local `db.sqlite3` database by default. 
Thus one can simply run the application like any other Django App using:

```bash
python manage.py runserver
```

This will only start the API server. 
To start the frontend component, use:


```bash
cd frontend
yarn start
```

This will open the development server (which automatically reloads) in a background window. 

In principle the settings can be found in [`settings.py`](mathdb/settings.py). 
To enable easier debugging, it is configured to automatically import settings from a file called `mathdb/local_settings.py`.
This file is intended to contain local settings, such as session tokens, or external authentication credentials. 
The file is also `.gitignore`d and should not be comitted. 

### Deployment via Docker

It is also possible to deploy this application via [Docker](https://www.docker.com/). 
In particular, an automated build [mathhub/mathdb](https://hub.docker.com/r/mathhub/mathdb) is available. 

For Docker purposes the configuration file `mathdb/docker_settings.py` is used.  
By default, it also uses a local sqlite database. 
All configuration can be set via environment variables, see [Dockerfile](Dockerfile) for details. 

## Code Structure

The code is layed out as any other Django app.
The entry point can be found in `mathdb`. 

## License
Licensed under the Terms of GPL3, see [LICENSE](LICENSE). 
