import pytest
import application

@pytest.fixture
def client():
    """Return flask test client."""
    return application.application.test_client()
