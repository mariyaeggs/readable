import application
import pytest


@pytest.fixture
def client():
    """Return flask test client."""
    return application.application.test_client()
