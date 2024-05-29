document.getElementById('show-all-button').addEventListener('click', function() {
    fetch('https://stephen-king-api.onrender.com/api/books')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const booksList = document.getElementById('books-list');
        const books = Array.isArray(data.data) ? data.data : [data.data];
        booksList.innerHTML = ''; // Clear existing list
        books.forEach(book => {
          const formattedBook = {
            title: book.Title,
            year: book.Year,
            publisher: book.Publisher,
            isbn: book.ISBN,
            pages: book.Pages,
            notes: Array.isArray(book.Notes) ? book.Notes.join(', ') : ''
          };
          
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>Titolo:</strong> ${formattedBook.title}<br>
            <strong>Anno:</strong> ${formattedBook.year}<br>
            <strong>Editore:</strong> ${formattedBook.publisher}<br>
            <strong>ISBN:</strong> ${formattedBook.isbn}<br>
            <strong>Pagine:</strong> ${formattedBook.pages}<br>
            <strong>Note:</strong> ${formattedBook.notes}<br>
          `;
          booksList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Ci è stato un problema con la operazione di fetch:', error);
      });
  });
  