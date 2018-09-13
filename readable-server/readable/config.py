"""Config file."""
import os
from dotenv import load_dotenv

load_dotenv()

# load user credentials from .env file
DBUSER = os.getenv('DBUSER')
DBPASSWORD = os.getenv('DBPASSWORD')
DBURL = os.getenv('DBURL')
DBNAME = os.getenv('DBNAME')

ENVIRONMENT = os.getenv('Environment')

# if testing, use installed sqlite databse
if ENVIRONMENT == 'test':
    CONNECTION_URL = 'sqlite://'
else:
    CONNECTION_URL = \
        'mysql+pymysql://{user}:{password}@{url}:3306/{dbname}'.format(
            user=DBUSER,
            password=DBPASSWORD,
            url=DBURL,
            dbname=DBNAME)
