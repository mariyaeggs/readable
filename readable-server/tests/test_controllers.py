"""Test controllers."""
import json
import flexmock

from oto import response

from readable.models import book_model


def test_base_route(client, headers):
    """Test hello route."""
    result = client.get('/', headers=headers)
    result_message = result.data.decode()

    assert result.status_code == 200
    assert result_message == 'all is well that begins well'


def test_get_books(client, headers):
    """Test get books route."""
    books_payload = [{'title': 'one'}, {'title': 'two'}]
    (flexmock(book_model).should_receive(
        'get_books').and_return(response.Response(books_payload)).once())

    result = client.get('/books', headers=headers)
    result_message = json.loads(result.data.decode())

    assert result.status_code == 200
    assert result_message == books_payload


def test_get_books_fail(client, headers):
    """Test get books when none found."""
    (flexmock(book_model).should_receive('get_books').and_return(
        response.create_not_found_response()).once())

    result = client.get('/books', headers=headers)
    result_message = json.loads(result.data.decode())

    assert result.status_code == 404
    assert result_message.get('code') == 'not_found_error'


def test_update_book_success(client, headers):
    """Test update_book success."""
    mock_updated_book = {'title': 'new title'}
    (flexmock(book_model).should_receive('update_book').with_args(
        1, mock_updated_book).and_return(
        response.Response(mock_updated_book)).once())

    result = client.put(
        'book/1', data=json.dumps(mock_updated_book), headers=headers)
    result_message = json.loads(result.data.decode())

    expected_message = mock_updated_book.copy()
    expected_message.update({'book_id': 1})

    assert result.status_code == 200
    assert result_message == mock_updated_book


def test_update_book_fail(client, headers):
    """Test update_book when book not found."""
    mock_updated_book = {'title': 'new title'}

    (flexmock(book_model).should_receive('update_book').with_args(
        1, mock_updated_book).and_return(
        response.create_not_found_response()).once())

    result = client.put(
        'book/1', data=json.dumps(mock_updated_book), headers=headers)
    result_message = json.loads(result.data.decode())

    assert result.status_code == 404
    assert result_message.get('code') == 'not_found_error'


def test_create_book_success(client, headers):
    """Test create book success."""
    new_book = {
        'shelf': 1,
        'isbn': '978-0143122968',
        'title': 'git this',
        'image_url': 'https://image.jpg',
        'author': 'linus torvalis'}

    expected_message = new_book.copy()
    expected_message.update({'book_id': 3})

    (flexmock(book_model).should_receive('create_book').with_args(
        new_book).and_return(response.Response(
            message=expected_message, status=201)).once())

    result = client.post(
        '/book', data=json.dumps(new_book), headers=headers)

    result_message = json.loads(result.data.decode())

    assert result.status_code == 201
    assert result_message == expected_message


def test_create_book_failure(client, headers):
    """Test create book failure."""
    new_book = {
        'shelf': 1,
        'isbn': '978-0143122968',
        'title': 'git this',
        'image_url': 'https://image.jpg',
        'author': 'linus torvalis'}

    (flexmock(book_model).should_receive('create_book').with_args(
        new_book).and_return(response.create_fatal_response()).once())

    result = client.post(
        '/book', data=json.dumps(new_book), headers=headers)

    assert result.status_code == 500


def test_delete_book(client, headers):
    """Test delete a book."""
    delete_message = 'Successfully deleted book: test title'
    (flexmock(book_model).should_receive('delete_book').with_args(
        3).and_return(response.Response(message=delete_message)).once())

    result = client.delete('/book/3', headers=headers)

    assert result.status_code == 200
