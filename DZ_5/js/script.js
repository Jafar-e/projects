let libraryArray = JSON.parse(localStorage.getItem('library')) || [];

document.getElementById("bookAddButton").onclick = getBookInfo;
document.getElementById("books").addEventListener('click', (event) => {
    if (event.target.classList.value === "bookButton buttonEdit") {
        getEditBookInfo(event.target.closest("article").querySelector(".bookName").innerHTML);
    } else if (event.target.classList.value === "bookButton buttonDelete") {
        deleteBook(event.target.closest("article").querySelector(".bookName").innerHTML);
    } else {
      return;
    }
 });
 document.getElementById("libraryButtons").addEventListener('click',(event) => {
    switch (event.target.classList.value) {
        case "buttonSort genre":
            filterLibrary("genre");
        break;
        case "buttonSort status":
            filterLibrary("status");
        break;
        case "buttonSort both":
            filterLibrary("both");
        break;
        case "buttonRefresh":
            refreshPage();
        break;
        case "buttonDeleteAll":
            deleteLibrary();
        break;
        default: return;
    }
 });

function showBookCounter () {
    const counterSelector = document.querySelector("#bookCounter>span");
    if (libraryArray.length) {
        counterSelector.innerHTML = libraryArray.length;
    } else {
        counterSelector.innerHTML = "0";
    }
    return;
}

function showLibrary () {
    let booksHTMLCode = "";

    libraryArray.forEach((bookObj) => {
        let bookStatusClass = bookObj.status ? "bookStatusTrue" : "bookStatusFalse";
        booksHTMLCode += '<article>'+
                        '<div class="doubleHeight"></div>'+
                        '<div class="bookName">'+bookObj.name+'</div>'+
                        '<div class="bookPublishingYear">'+bookObj.year+'</div>'+
                        '<div class="doubleHeight buttons">'+
                            '<div class="bookStatus '+bookStatusClass+'"></div>'+
                        '</div>'+
                        '<div class="doubleHeight buttons">'+
                            '<div class="bookButton buttonEdit"></div>'+
                            '<div class="bookButton buttonDelete"></div>'+
                        '</div>'+
                        '<div class="bookAuthor">'+bookObj.author+'</div>'+
                        '<div class="bookGenre">'+bookObj.genre+'</div>'+
                    '</article>'
    })
    document.querySelector("#books").innerHTML = booksHTMLCode;
    showBookCounter();
}

function saveLibrary () {
    localStorage.setItem('library', JSON.stringify(libraryArray));
}

function deleteLibrary () {
    localStorage.removeItem('library');
    if (libraryArray.length) {
        libraryArray = [];
    } else {
        alert("Нет книг для удаления");
}
    showLibrary();
    return;
}

function refreshPage () {
    window.location.reload();
}

function getBookInfo () {
    let name, author, year, genre, isRead;
    if (document.getElementById("bookNameFormId").value) {
        name = document.getElementById("bookNameFormId").value;
    } else {
        alert("Введите название книги");
        return;
    }
    if (document.getElementById("bookPublishingYearFormId").value) {
        year = document.getElementById("bookPublishingYearFormId").value;
    } else {
        alert("Введите год издания");
        return;
    }
    if (document.getElementById("bookAuthorFormId").value) {
        author = document.getElementById("bookAuthorFormId").value;
    } else {
        alert("Введите имя автора книги");
        return;
    }
    if (document.getElementById("bookGenreFormId").value) {
        genre = document.getElementById("bookGenreFormId").value;
    } else {
        alert("Введите жанр книги");
        return;
    }
    isRead = document.getElementById("bookStatusId").value === "0" ? false : true;
    addBook(name, author, year, genre, isRead);
}

function getEditBookInfo(bookName) {
    let editedBookName = prompt("Введите новое название:");
    if (libraryArray.find(book => book.name === editedBookName)) {
        alert("Такая книга уже добавлена");
        return;
    }
    if (editedBookName) {
        editBook("name", editedBookName, bookName);
        let editedBookAuthor = prompt("Новое имя автора:");
        if (editedBookAuthor) {
            editBook("author", editedBookAuthor, editedBookName);
        }
        let editedBookYear = prompt("Обновите год издания:");
        if (editedBookYear   && !isNaN(editedBookYear) && editedBookYear>=0 && editedBookYear<=2024 ) {
            editBook("year", editedBookYear, editedBookName);
        } else {
            alert("Год издания должен быть числом от 0 до 2024 \n Этот параметр не будет изменен");
        }
        let editedBookGenre = prompt("Обновите жанр:");
        if (editedBookGenre) {
            editBook("genre", editedBookGenre, editedBookName);
        }
        let editedBookStatus = confirm("Вы прочли эту книгу?");
        if (editedBookStatus) {
            editBook("status", editedBookStatus, editedBookName);
        } else {
            editBook("status", editedBookStatus, editedBookName);
        }
    } else {
        let editedBookAuthor = prompt("Новое имя автора:");
        if (editedBookAuthor) {
            editBook("author", editedBookAuthor, bookName);
        }
        let editedBookYear = prompt("Обновите год издания:");
        if (editedBookYear  && !isNaN(editedBookYear) && editedBookYear>=0 && editedBookYear<=2024) {
            editBook("year", editedBookYear, bookName);
        } else {
            alert("Год издания должен быть числом от 0 до 2024 \n Этот параметр не будет изменен");
        }
        let editedBookGenre = prompt("Обновите жанр:");
        if (editedBookGenre) {
            editBook("genre", editedBookGenre, bookName);
        }
        let editedBookStatus = confirm("Вы прочли эту книгу?");
        if (editedBookStatus) {
            editBook("status", editedBookStatus, bookName);
        } else {
            editBook("status", editedBookStatus, bookName);
        }
    }
    return;
}

function addBook (name, author, year, genre, status) {
    if (libraryArray.find(book => book.name === name)) {
        alert("Такая книга уже добавлена");
        return;
    }
    libraryArray.push({name: name, author: author, year: year, genre: genre, status: status});
    saveLibrary();
    showLibrary();
    return;
}

function deleteBook (bookName) {
    libraryArray = libraryArray.filter(book => book.name !== bookName);
    saveLibrary();
    showLibrary();
}

function filterLibrary(sortType) {
    switch (sortType) {
        case "genre":
            libraryArray = libraryArray.sort((prev, next) => {
                return prev.genre.localeCompare(next.genre)
            })
            break;
        case "status":
            libraryArray = libraryArray.sort((prev, next) => {
                return next.status - prev.status;
            })
            break;
        case "both":
            libraryArray = libraryArray.sort((prev, next) => {
                return prev.genre.localeCompare(next.genre) || next.status - prev.status;
            })
            break;
        default: return;
    }
    saveLibrary();
    showLibrary();
}

function editBook(field, newValue, bookName) {
    libraryArray = libraryArray.map((book) => {
        if (book.name === bookName) {
            book[field] = newValue;
        }
        return book;
    })
    saveLibrary();
    showLibrary();
}

showLibrary();
