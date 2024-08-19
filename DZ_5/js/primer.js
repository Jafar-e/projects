let library = JSON.parse(localStorage.getItem('library')) || []

window.addBook = function(name, author, year, genre) {
    library.push({name: name, author: author, year: year, genre: genre, status: false});
    window.library = library;
}
 
window.editBook = function(field, newValue, bookName) {
    const editedLibrary = library.map(function(book) {
        if (book.name === bookName) {
            book[field] = newValue
        }
        return book;
    })
    library = editedLibrary;
    window.library = library;
}

window.deleteBook = function(bookName) {
    const editedLibrary = library.filter(function(book) {
        return book.name !== bookName
    })

    library = editedLibrary;
    window.library = library;
}

window.saveLibrary = function() {
    localStorage.setItem('library', JSON.stringify(library))
}

window.deleteLibrary = function() {
    localStorage.removeItem('library')
    library = []
    window.library = library;
}

window.filterLibrary = function(key) {
    switch (key) {
        case 'status':
            library = library.sort(function(prev, next) {
                return next.status - prev.status;
            })
            break;
        case 'genre':
            library = library.sort(function(prev, next) {
                return prev.genre.localeCompare(next.genre)
            })
            break;
        case 'genre+status':
            library = library.sort(function(prev, next) {
                return next.status - prev.status || prev.genre.localeCompare(next.genre);
            })
            break;
        default:
            console.warn('Введите сортировку по статусу или жанру!')
    }
}

window.library = library