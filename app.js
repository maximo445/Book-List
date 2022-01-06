class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const booksTable = document.querySelector('#book-list-table');
        const tr = document.createElement('tr');
        tr.innerHTML = 
        `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>x</td>
        `
        booksTable.appendChild(tr);
    }
}

document.querySelector('#submit-btn').addEventListener('click', function () {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const ui = new UI();

    const book = new Book(title, author, isbn);

    ui.addBookToList(book);

});

