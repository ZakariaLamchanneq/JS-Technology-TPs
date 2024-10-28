import Book from './book.js'; // Importer la classe Book

// Fonction pour récupérer et afficher tous les livres
function fetchBooks() {
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => {
            const bookList = document.getElementById('bookList');
            bookList.innerHTML = ''; // Vider la liste avant d'ajouter les livres
            books.forEach(bookData => {
                const book = new Book(
                    bookData.title,
                    bookData.author,
                    bookData.pages,
                    bookData.status,
                    bookData.price,
                    bookData.pagesRead,
                    bookData.format,
                    bookData.suggestedBy
                );

                // Créer un conteneur pour chaque livre
                const bookItem = document.createElement('div');
                bookItem.className = 'border p-4 rounded-lg shadow-md mb-4';

                // Ajouter le titre et l'auteur
                const titleElement = document.createElement('h3');
                titleElement.className = 'text-lg font-semibold';
                titleElement.textContent = `${book.title} by ${book.author}`;

                // Ajouter le nombre de pages et le statut
                const infoElement = document.createElement('p');
                infoElement.textContent = `Pages: ${book.pages} | Status: ${book.status}`;

                // Ajouter le prix
                const priceElement = document.createElement('p');
                priceElement.textContent = `Price: $${book.price.toFixed(2)}`;

                // Ajouter le nombre de pages lues
                const pagesReadElement = document.createElement('p');
                pagesReadElement.textContent = `Pages Read: ${book.pagesRead}`;

                // Ajouter le format
                const formatElement = document.createElement('p');
                formatElement.textContent = `Format: ${book.format}`;

                // Créer un bouton de suppression
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'mt-2 bg-red-500 text-white p-2 rounded';
                deleteButton.onclick = () => deleteBook(bookData._id); // Appeler la fonction de suppression

                // Ajouter toutes les informations au conteneur
                bookItem.appendChild(titleElement);
                bookItem.appendChild(infoElement);
                bookItem.appendChild(priceElement);
                bookItem.appendChild(pagesReadElement);
                bookItem.appendChild(formatElement);
                bookItem.appendChild(deleteButton); // Ajouter le bouton de suppression

                // Ajouter le conteneur à la liste des livres
                bookList.appendChild(bookItem);
            });
        })
        .catch(err => console.error('Error fetching books:', err));
}

// Fonction pour supprimer un livre
function deleteBook(bookId) {
    fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                alert('Book deleted successfully');
                fetchBooks(); // Recharger la liste des livres après suppression
            } else {
                alert('Error deleting book');
            }
        })
        .catch(err => console.error('Error deleting book:', err));
}

// Appel de fetchBooks lors du chargement de la page
document.addEventListener('DOMContentLoaded', fetchBooks);

// Gestionnaire de soumission du formulaire
document.getElementById('bookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const status = document.getElementById('status').value;
    const price = parseFloat(document.getElementById('price').value);
    const pagesRead = parseInt(document.getElementById('pagesRead').value);
    const format = document.getElementById('format').value;
    const suggestedBy = document.getElementById('suggestedBy').value;

    const book = new Book(title, author, pages, status, price, pagesRead, format, suggestedBy);

    // Insérer le livre dans MongoDB
    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    })
        .then(response => {
            if (response.ok) {
                alert('Book added successfully');
                fetchBooks(); // Recharger la liste des livres
            } else {
                alert('Error adding book');
            }
        })
        .catch(err => console.error(err));
});
