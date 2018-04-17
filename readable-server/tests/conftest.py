import application
import pytest


@pytest.fixture
def client():
    """Return flask test client.

    This is a flask builtin useful for testing purposes.
    """
    return application.application.test_client()


@pytest.fixture
def headers():
    """Return content headers.

    Returns a dict of headers, Content-Type is necessary for the
    request.get_json() method to work in the controller when testing.
    """
    return {'Content-Type': 'application/json'}
