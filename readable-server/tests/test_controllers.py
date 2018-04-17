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
        'get_books').and_return(response.Response(books_payload)).once())

    result = client.get('/books')
    result_message = json.loads(result.data.decode())

    assert result.status_code == 200
    assert result_message == books_payload


def test_get_books_fail(client):
    """Test get books when none found."""
    (flexmock(book_model).should_receive('get_books').and_return(
        response.create_not_found_response()).once())

    result = client.get('/books')
    result_message = json.loads(result.data.decode())

    assert result.status_code == 404
    assert result_message.get('code') == 'not_found_error'


def test_update_book(client):
    """Test update_book success."""
    mock_updated_book = {'title': 'new title', 'book_id': 1}
    (flexmock(book_model).should_receive('update_book').and_return(
        response.Response(mock_updated_book)).once())

    result = client.put('book/1', data=mock_updated_book)
    result_message = json.loads(result.data.decode())

    assert result.status_code == 200
    assert result_message == mock_updated_book


def test_update_book(client):
    """Test update_book when book not found."""
    mock_updated_book = {'title': 'new title', 'book_id': 1}
    (flexmock(book_model).should_receive('update_book').and_return(
        response.create_not_found_response()).once())

    result = client.put('book/1', data=mock_updated_book)
    result_message = json.loads(result.data.decode())

    assert result.status_code == 404
    assert result_message.get('code') == 'not_found_error'








