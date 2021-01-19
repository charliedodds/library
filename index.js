let books = JSON.parse(getBooks());

function getBooks() {
  if (!localStorage.getItem('library')) {
    localStorage.setItem('library', '[]');
  }
  return localStorage.getItem('library');
}

function Book(title, author, pages, beenRead, cover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.beenRead = beenRead;
  this.cover = cover;
}

function addBookToLibrary(book, arrayOfBooks) {
  arrayOfBooks.push(book);
  updateLocalStorage();
}

const library = document.getElementById('library');

for (let i = 0; i < books.length; i++) {
  createBookElement(books[i], i);
}

function createBookElement(book, idx) {
  const createdBook = document.createElement('div');
  createdBook.classList.add('book');
  createdBook.dataset.bookNum = idx;
  // create book
  const newBookTitle = document.createElement('h2');
  newBookTitle.classList.add('book-title');
  newBookTitle.textContent = book.title;
  createdBook.appendChild(newBookTitle);
  // create and add book title to book div
  const newBookCover = document.createElement('img');
  newBookCover.classList.add('book-cover');
  newBookCover.setAttribute('src', book.cover);
  createdBook.appendChild(newBookCover);
  // create and add book cover to book div
  const newBookAuthor = document.createElement('h3');
  newBookAuthor.classList.add('book-author');
  newBookAuthor.textContent = book.author;
  createdBook.appendChild(newBookAuthor);
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
  newBookRead.addEventListener('click', toggleRead);
  newBookInfoDiv.appendChild(newBookRead);
  // create and add read/to be read to book info div
  const deleteDiv = document.createElement('div');
  deleteDiv.classList.add('book-delete');
  deleteDiv.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteDiv.addEventListener('click', deleteBook);
  newBookInfoDiv.appendChild(deleteDiv);
  // create and add delete button to book info div
  createdBook.appendChild(newBookInfoDiv);
  library.appendChild(createdBook);
  // add book to library section
}

const form = document.querySelector('form');

form.addEventListener('submit', submitBook);
// ANIMATE NEW BOOK FORM

const addBtn = document.getElementById('addBook');

addBtn.addEventListener('click', handleNewBookClick);

function handleNewBookClick() {
  removeInstructions();
  toggleRotate();
  toggleBookForm();
  resetInputs();
}

function toggleBookForm() {
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
  deleteBookFromBooksArray(e);
  updateBookNums();
  updateLocalStorage();
}

function deleteBookFromBooksArray(e) {
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

function toggleRead(e) {
  switch (e.target.textContent) {
    case 'Read':
      e.target.textContent = 'To be read';
      break;
    case 'To be read':
      e.target.textContent = 'Read';
      break;
  }
}

function submitBook(e) {
  e.preventDefault();
  const bookTitle = document.getElementById('bookTitle');
  const bookCover = document.getElementById('bookCover');
  const bookAuthor = document.getElementById('bookAuthor');
  const bookPages = document.getElementById('bookPages');
  const bookRead = document.getElementById('bookRead');
  const newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    parseInt(bookPages.value),
    bookRead.checked,
    bookCover.value
  );
  addBookToLibrary(newBook, books);
  createBookElement(newBook, books.length - 1);
  handleNewBookClick();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('library', JSON.stringify(books));
}

function removeInstructions() {
  const instructions = document.getElementById('instructions');
  if (instructions.style.display !== 'none') {
    instructions.style.display = 'none';
  }
}
