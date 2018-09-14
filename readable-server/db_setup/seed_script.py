import csv
import MySQLdb

import pandas

import os
from dotenv import load_dotenv

load_dotenv()

DBUSER = os.getenv('DBUSER')
DBPASSWORD = os.getenv('DBPASSWORD')
DBURL = os.getenv('DBURL')
DBNAME = os.getenv('DBNAME')

mydb = MySQLdb.connect(
    host=DBURL,
    user=DBUSER,
    passwd=DBPASSWORD,
    db=DBNAME)


csv_data = pandas.read_csv('../recommender-ml/BX-Books.csv', sep=';', error_bad_lines=False, encoding="latin-1")



csv_data.columns = ['ISBN', 'BOOK_TITLE', 'BOOK_AUTHOR', 'PUBLICATION_YEAR', 'PUBLISHER', 'IMAGE_URL_S', 'IMAGE_URL_M', 'IMAGE_URL_L']

csv_data.to_sql(con=mydb, name='BX_BOOKS',
  if_exists='replace', flavor='mysql')
