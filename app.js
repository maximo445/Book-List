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
    }


});

