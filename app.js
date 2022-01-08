let count = 0;

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        
        Store.addBook(book);
        
        // const booksTable = document.querySelector('#book-list-table');       
        // const tr = document.createElement('tr');
        // tr.innerHTML = 
        // `<td>${book.title}</td>
        // <td>${book.author}</td>
        // <td>${book.isbn}</td>
        // <td class="delete">x</td>
        // `
        // booksTable.appendChild(tr);
    }

    showAlert(message, className) {
        const myAlert = document.createElement('div');
        myAlert.className = `${className}`
        myAlert.appendChild(document.createTextNode(message));
        const container = document.querySelector('#container');
        const heading = document.querySelector('#container h1');
        container.insertBefore(myAlert, heading);

        setTimeout(() => {
            myAlert.remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.remove();
        }

        let myBooks = Store.getBooks();
        let myString = `[`;
        let index = 1;
        let size = myBooks.length;
        console.log(size);
        let comma;
        myBooks.forEach(function (book) {
            if (size > index) {
                comma = ',';
            } else {
                comma = '';
            }

            if (target.parentElement.children[2].innerText == book.isbn) {

            } else {

                myString += `{"title": "${book.title}", "author": "${book.author}", "isbn": "${book.isbn}", "id": "0"}${comma}`;
            }

            index++;
        });

        myString += `]`;

        localStorage.setItem('books', myString);

        Store.displayBooks();

        console.log('My created string: ' + myString);

    }

    clearFields() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

class Store {
    static getBooks () {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
            return books;
        } else {
            console.log(localStorage.getItem('books'));
            books = JSON.parse(localStorage.getItem('books'));
            console.log(books);
            return books;
        }
    }

    static displayBooks () {
        const booksTable = document.querySelector('#book-list-table');         
        const bookRows = Array.from(document.querySelectorAll('.book-row'));
        bookRows.forEach(function (book) {
            book.remove();
        });

        let books = Store.getBooks();
        books.forEach(book => {
            const tr = document.createElement('tr');  
            tr.className = 'book-row';
            tr.innerHTML = 
                            `<td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.isbn}</td>
                            <td class="delete">x</td>
                            `
            booksTable.appendChild(tr);
        }); 
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        Store.displayBooks();
    }

    static removeBook(target) {
       
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks());

document.querySelector('#submit-btn').addEventListener('click', function () {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const ui = new UI();  

    if (title === "" || author === "" || isbn === "") {
        ui.showAlert('Check your inputs', 'error');
    } else {  
        const book = new Book(title, author, isbn); 
        book.id = `${count}`;   
        ui.addBookToList(book);
        count++;
        ui.showAlert('Book was added to the list!', 'success');
        ui.clearFields();
    }
});

document.querySelector('#book-list-table').addEventListener('click', function (event) {
    const ui = new UI();
    ui.deleteBook(event.target);
    ui.showAlert('Book was removed successfully', 'success')
});

