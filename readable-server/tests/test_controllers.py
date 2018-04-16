"""Test controllers."""
import json
import flexmock

from oto import response

from readable.models import book_model



def test_base_route(client):
    """Test hello route."""
    result = client.get('/')
    result_message = result.data.decode()

    assert result.status_code == 200
    assert result_message == 'all is well that begins well'


def test_get_books(client):
    """Test get books route."""
    books_payload = [{'title': 'one'}, {'title': 'two'}]
    (flexmock(book_model).should_receive(
        'get_books').and_return(response.Response(books_payload)))

    result = client.get('/books')
    result_message = json.loads(result.data.decode())

    assert result.status_code == 200
    assert result_message == books_payload






