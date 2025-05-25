import type { Book } from '../types/Books';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const BookList = ({ books, onEdit, onDelete }: BookListProps) => {
  if (books.length === 0) {
    return <p>No hay libros disponibles. Da clic en agregar uno</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <h3>{book.title}</h3>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Descripción:</strong> {book.description}</p>
          <p><strong>Páginas:</strong> {book.pages}</p>
          <p><strong>Editorial:</strong> {book.publisher}</p>
          <p><strong>Año de Publicación:</strong> {book.year_published}</p>
          <div className="book-actions">
            <button onClick={() => onEdit(book)}>Editar</button>
            <button onClick={() => onDelete(book.id)} className="delete">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
