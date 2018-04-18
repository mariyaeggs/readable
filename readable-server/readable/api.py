"""Application API."""

from flask import Flask
from flask_cors import CORS

application = Flask(__name__)
application.debug = True
CORS(application)
