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

console.log(books);

const library = document.getElementById('library');

for (let book of books) {
  createBookElement(book);
}

function createBookElement(book) {
  const newBook = document.createElement('div');
  newBook.classList.add('book');
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
  const newBookInfoDiv = document.createElement('div');
  newBookInfoDiv.classList.add('book-info');
  // create and add book cover to book info div
  const newBookAuthor = document.createElement('p');
  newBookAuthor.classList.add('book-author');
  newBookAuthor.textContent = book.author;
  newBookInfoDiv.appendChild(newBookAuthor);
  // create and add book author to book info div
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
  newBook.appendChild(newBookInfoDiv);
  library.appendChild(newBook);
  // add book to library section
}
