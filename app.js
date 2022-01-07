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
        <td class="delete">x</td>
        `
        booksTable.appendChild(tr);
    }

    showAlert(message, className) {
        const myAlert = document.createElement('div');
        myAlert.className = `${className}`

        console.log(myAlert);

        myAlert.appendChild(document.createTextNode(message));
        const container = document.querySelector('#container');
        console.log(container)
        const heading = document.querySelector('#container h1');
        console.log(heading);
        container.insertBefore(myAlert, heading);

        setTimeout(() => {
            myAlert.remove();
        }, 3000);
    }

    deleteBook(target) {
        console.log(target)
        if (target.classList.contains('delete')) {
            target.parentElement.remove();
        }
    }

    clearFields() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

document.querySelector('#submit-btn').addEventListener('click', function () {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const ui = new UI();  

    if (title === "" || author === "" || isbn === "") {
        ui.showAlert('Check your inputs', 'error');
    } else {  
        const book = new Book(title, author, isbn);    
        ui.addBookToList(book);
        ui.showAlert('Book was added to the list!', 'success');
        ui.clearFields();
    }
});

document.querySelector('#book-list-table').addEventListener('click', function (event) {
    const ui = new UI();
    ui.deleteBook(event.target);
    ui.showAlert('Book was removed successfully', 'success')
});

