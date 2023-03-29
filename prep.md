# Preparing a Django App for Deployment.

The aim of this guide is to prepare the app for deployment to Heroku, to do this we need to run (frontend and backend) from the same port (the backend one). As it stands we run them separately, this is great for development, it allows us access to lots of benefits like hot reloading and being able to test changes quickly, but this is not that state it will be deployed in. 

### Frontend

* Make sure your files/folders are correctly cased within your app, folders are lowered cased eg `components` . Check that all import statements have the correct casing, this will cause errors in deployment if they are not matching.

* Make sure all urls in requests end in a trailing `/` regardless of verb. So a GET request should be for example `axios.get('/api/pokes/)` the trailing slash at the end of `pokes/` will be required. 

* Add a `config.js` to `client/src` and add the following code:

  ```sh
  const devUrl = '/api'
  const prodUrl = process.env.REACT_APP_PROD_URL
  export const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl
  ```
  
*  To your .env file add the following - replacing with your own backend URL, make sure to add the trailing '/api'
```
REACT_APP_PROD_URL=myherokubackendurl.herokuapp.com/api 
```

- In `client/src/lib/api.js` import `baseUrl` from the `config.js` file you just created to replace the `baseUrl` hardcoded in that file.

- Navigate to the client directory and run the terminal command `npm run build`. This will have compile your frontend source code and generate a “build” directory inside the frontend folder.

- Add a file called `_redirects` to the `public` directory. To ensure the `BrowserRouter` works as expected, add the following code:

  ```sh
  /* /index.html 200
  ```

### Backend

* In the project root, install the Python .env package `pipenv install python-dotenv` and another to configure our database on heroku `pipenv install dj-database-url`. We'll also use a cors package so `pipenv install django-cors-headers`.

* Navigate to `project/settings.py`

* To the top of the file, replace any current imports with the following the following

```python
import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url
load_dotenv()
```

* Find the key  `SECRET_KEY` and replace with the following *NOTE THERE ARE PLACEHOLDER VALUES BELOW REPLACE WITH YOUR OWN*:

```python

if str(os.getenv('ENVIRONMENT')) == 'development':
    SECRET_KEY = 'whateveryourdevelopmentsecretleyvaluewas' # should be whatever your original key was
else:
    SECRET_KEY = str(os.getenv('SECRET_KEY'))

```

* Find the key `INSTALLED_APPS` and add the following after the `django.contrib` apps and above `rest_framework` and all your own apps: 

```py
'corsheaders'
```

* In `MIDDLEWARE` at the top of the list, add:

```py
'corsheaders.middleware.CorsMiddleware',
'django.middleware.common.CommonMiddleware',
```

* Add the following new line after `MIDDLEWARE`:
```py
CORS_ALLOW_ALL_ORIGINS=True
```

* Find the key `DATABASES` and replace with the following *NOTE THERE ARE PLACEHOLDER VALUES BELOW REPLACE WITH YOUR OWN*:

```python
DATABASES = {}
if str(os.getenv('ENVIRONMENT')) == 'development':
    DATABASES['default'] =  {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'name-of-your-db', 
        'HOST': 'localhost',
        'PORT': 5432
    }
else:
    DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)
```


* In the root of your project,  create a file `.env` and add the following:

```
ENVIRONMENT=development
```

