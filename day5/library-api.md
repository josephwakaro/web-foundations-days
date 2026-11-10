# Library API Design

A REST API for a library's `books` resource. All request and response bodies use JSON.

## Endpoints

### 1. List books
- **Method:** GET
- **Path:** `/books`
- **Description:** Returns all books in the library.
- **Request body:** none
- **Success status:** 200 OK

### 2. Get one book
- **Method:** GET
- **Path:** `/books/{id}`
- **Description:** Returns the book with the given id.
- **Request body:** none
- **Success status:** 200 OK

### 3. Create a book
- **Method:** POST
- **Path:** `/books`
- **Description:** Adds a new book to the library.
- **Example request body:**
  ```json
  {
    "title": "Weep Not, Child",
    "author": "Ngugi wa Thiong'o",
    "isbn": "9780435908300",
    "year": 1964
  }
  ```
- **Success status:** 201 Created

### 4. Update a book
- **Method:** PUT
- **Path:** `/books/{id}`
- **Description:** Replaces the details of an existing book.
- **Example request body:**
  ```json
  {
    "title": "Weep Not, Child",
    "author": "Ngugi wa Thiong'o",
    "isbn": "9780435908300",
    "year": 1964
  }
  ```
- **Success status:** 200 OK

### 5. Delete a book
- **Method:** DELETE
- **Path:** `/books/{id}`
- **Description:** Removes the book with the given id.
- **Request body:** none
- **Success status:** 204 No Content

### 6. List books by an author
- **Method:** GET
- **Path:** `/books?author={name}`
- **Description:** Returns only the books written by the given author, using a query parameter.
- **Example:** `GET /books?author=Chinua%20Achebe`
- **Request body:** none
- **Success status:** 200 OK

## Error codes

### 400 Bad Request
- The request is invalid or malformed.
- **Example:** `POST /books` with a body missing the required `title` field, or with `year` set to `"abc"`.

### 404 Not Found
- The requested resource does not exist.
- **Example:** `GET /books/9999` when no book with id 9999 exists.
