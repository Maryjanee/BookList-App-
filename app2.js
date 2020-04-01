const form = document.querySelector("form");
const bookList = document.querySelector("#book-list");

class Book{
  constructor(name, author, isbn){
    this.name = name;
    this.author = author;
    this.isbn = isbn;
  }
}
class Ui{
  addBook(book){
  const tableBody = document.querySelector('tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `<th>${book.name}</th>
  <th>${book.author}</th>
  <th>${book.isbn}</th>
  <th><i class="fas fa-trash-alt"></i></th>`;
  tableBody.appendChild(tr);
}

clearFields(name, author,isbn){
  name.value = "";
  author.value = "";
  isbn.value = "";
}
showAlert(message, alertClass){
  const container = document.querySelector(".container");
  const form = document.querySelector("form");
  const divEl = document.createElement('div');
  const text = document.createTextNode(message);
  divEl.classList.add(alertClass);
  divEl.appendChild(text);
  container.insertBefore(divEl, form);
  setTimeout(()=> divEl.remove(), 2000);
}


//Local storage Class

class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui  = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

form.addEventListener('submit', (e) => {
  const ui = new Ui;
  const name = document.querySelector('#name');
  const author = document.querySelector("#author");
  const isbn = document.querySelector('#isbn');
  if(name.value == "" || author.value == "" || isbn.value == ""){
    ui.showAlert("One or more Field's empty", "error");
  }else{
    const newBook = new Book(name.value,author.value,isbn.value);
    Store.addBook(newBook);
    ui.addBook(newBook);

    ui.clearFields(name,author,isbn);
    ui.showAlert("Book Added", "success");
  }
  e.preventDefault();
})

bookList.addEventListener("click", (e)=>{
  const ui = new Ui;
  e.preventDefault()
  if(e.target.classList == "fas fa-trash-alt"){
    e.target.parentElement.parentElement.remove();
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert("Book Removed", "error");

  }
})
