from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


from readable import config

_db_engine = create_engine(config.CONNECTION_URL)
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
