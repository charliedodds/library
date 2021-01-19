let books = [];

function Book(title, author, pages, beenRead, cover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.beenRead = beenRead;
  this.cover = cover;
}

function addBookToLibrary(book, arrayOfBooks) {
  arrayOfBooks.push(book);
}

const harryPotter1 = new Book(
  "Harry Potter and the Philosopher's Stone",
  'J.K. Rowling',
  223,
  true,
  'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg/220px-Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg'
);

addBookToLibrary(harryPotter1, books);

const harryPotter2 = new Book(
  'Harry Potter and the Chamber of Secrets',
  'J.K. Rowling',
  251,
  false,
  'https://images-na.ssl-images-amazon.com/images/I/51kdLYNJFsL._SX326_BO1,204,203,200_.jpg'
);

addBookToLibrary(harryPotter2, books);

const library = document.getElementById('library');

for (let i = 0; i < books.length; i++) {
  createBookElement(books[i], i);
}

function createBookElement(book, idx) {
  const newBook = document.createElement('div');
  newBook.classList.add('book');
  newBook.dataset.bookNum = idx;
  // create book
  const newBookTitle = document.createElement('h2');
  newBookTitle.classList.add('book-title');
  newBookTitle.textContent = book.title;
  newBook.appendChild(newBookTitle);
  // create and add book title to book div
  const newBookCover = document.createElement('img');
  newBookCover.classList.add('book-cover');
  newBookCover.setAttribute('src', book.cover);
  newBook.appendChild(newBookCover);
  // create and add book cover to book div
  const newBookAuthor = document.createElement('h3');
  newBookAuthor.classList.add('book-author');
  newBookAuthor.textContent = book.author;
  newBook.appendChild(newBookAuthor);
  // create and add book author to book div
  const newBookInfoDiv = document.createElement('div');
  newBookInfoDiv.classList.add('book-info');
  // create book info div
  const newBookPages = document.createElement('p');
  newBookPages.classList.add('book-pages');
  newBookPages.textContent = `${book.pages} pages`;
  newBookInfoDiv.appendChild(newBookPages);
  // create and add number of pages to book info div
  const newBookRead = document.createElement('p');
  newBookRead.classList.add('book-read');
  newBookRead.textContent = book.beenRead ? 'Read' : 'To be read';
  newBookInfoDiv.appendChild(newBookRead);
  // create and add read/to be read to book info div
  const deleteDiv = document.createElement('div');
  deleteDiv.classList.add('book-delete');
  deleteDiv.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteDiv.addEventListener('click', deleteBook);
  newBookInfoDiv.appendChild(deleteDiv);
  // create and add delete button to book info div
  newBook.appendChild(newBookInfoDiv);
  library.appendChild(newBook);
  // add book to library section
}

// ANIMATE NEW BOOK FORM

const addBtn = document.getElementById('addBook');

addBtn.addEventListener('click', handleNewBookClick);

function handleNewBookClick() {
  toggleRotate();
  toggleBookForm();
  resetInputs();
}

function toggleBookForm() {
  const form = document.querySelector('form');
  form.classList.toggle('hiding');
  form.classList.toggle('showing');
}

function toggleRotate() {
  const plus = document.getElementById('plus');
  plus.classList.toggle('rotate');
}

function resetInputs() {
  const inputs = document.querySelectorAll('input');
  for (let input of inputs) {
    if (input.checked) {
      input.checked = false;
    } else {
      input.value = '';
    }
  }
}

function deleteBook(e) {
  const bookToDelete = document.querySelector(
    `div[data-book-num="${e.target.parentElement.parentElement.parentElement.dataset.bookNum}"]`
  );
  library.removeChild(bookToDelete);
  updateBooksArray(e);
  updateBookNums();
}

function updateBooksArray(e) {
  books.splice(
    e.target.parentElement.parentElement.parentElement.dataset.bookNum,
    1
  );
}

// this function prevents books being created with the same book num data attribute
function updateBookNums() {
  for (let i = 0; i < books.length; i++) {
    const booksToUpdate = document.querySelectorAll('div.book');
    booksToUpdate[i].dataset.bookNum = i;
  }
}
