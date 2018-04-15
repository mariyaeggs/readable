from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from oto.adaptors.flask import flaskify
from oto import response

DB_URL = 'mysql+pymysql://mariyaeggs:dbreadable@dbreadable.czp7awvfoore.us-east-1.rds.amazonaws.com/dbreadable'


_db_engine = create_engine(DB_URL)
_db_session = sessionmaker(bind=_db_engine)

BaseModel = declarative_base()

@contextmanager
def db_session():
  session = _db_session()
  try:
    yield session
    session.commit()
  except:
    session.rollback()
    raise
  finally:
    session.close()
