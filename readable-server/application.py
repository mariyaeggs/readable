"""Readable Server Application."""
from readable import api
from readable import config
from readable import controller

application = api.application

if __name__ == '__main__':
    application.run(host='0.0.0.0')
