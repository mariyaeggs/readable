"""Config file."""
import os
from dotenv import load_dotenv

load_dotenv()

DBUSER = os.getenv('DBUSER')
DBPASSWORD=os.getenv('DBPASSWORD')
DBURL=os.getenv('DBURL')
DBNAME=os.getenv('DBNAME')

SQLALCHEMY_DATABASE_URI = \
    'mysql+pymysql://{user}:{password}@{url}:3306/{dbname}'.format(
        user=DBUSER,
        password=DBPASSWORD,
        url=DBURL,
        dbname=DBNAME)

