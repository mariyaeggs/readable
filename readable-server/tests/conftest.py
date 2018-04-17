import application
import pytest


@pytest.fixture
def client():
    """Return flask test client."""
    return application.application.test_client()


@pytest.fixture
def headers():
    """Return content headers."""
    return {'Content-Type': 'application/json'}
