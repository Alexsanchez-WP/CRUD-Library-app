import { useEffect, useState } from "react";
import axios from "axios";
import type { Book, BookForm as BookFormType } from "./types/Books";
import BookList from "./components/BookList";
import BookFormComponent from "./components/BookForm";
import "./App.css";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBooks = async () => {
    try {
      setError(null);
      const res = await axios.get("http://localhost:3000/books");
      setBooks(res.data);
      if (res.data.length === 0) {
        setError(
          "No se encontraron libros. Agrega uno para comenzar, o verifica si tu archivo db.json está vacío o si json-server está funcionando correctamente en el puerto 3000."
        );
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError(
        "Error al cargar los libros. ¿Está json-server ejecutándose en el puerto 3000 y configurado en vite.config.ts?"
      );
    }
  };

  const deleteBook = async (id: number) => {
    try {
      setError(null);
      await axios.delete(`http://localhost:3000/books/${id}`);
      getBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("Error al eliminar el libro.");
    }
  };

  const handleEdit = (book: Book) => {
    setBookToEdit(book);
    setShowForm(true);
    setError(null);
  };

  const handleFormSubmit = async (formData: BookFormType) => {
    try {
      setError(null);
      if (bookToEdit && bookToEdit.id) {
        await axios.put(
          `http://localhost:3000/books/${bookToEdit.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3000/books", formData);
      }
      getBooks();
      setShowForm(false);
      setBookToEdit(null);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        "Error al guardar el libro. Revisa la consola para más detalles."
      );
    }
  };

  const handleAddNewBookClick = () => {
    setBookToEdit(null);
    setShowForm(true);
    setError(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setBookToEdit(null);
    setError(null);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Biblioteca CRUD</h1>
        {!showForm && (
          <button onClick={handleAddNewBookClick} className="add-new-button">
            Agregar Nuevo Libro
          </button>
        )}
      </header>

      {error && !showForm && (
        <p style={{ color: "red", textAlign: "center", margin: "1rem" }}>
          {error}
        </p>
      )}

      {showForm && (
        <>
          {error && (
            <p style={{ color: "red", textAlign: "center", margin: "1rem" }}>
              {error}
            </p>
          )}
          <BookFormComponent
            bookToEdit={bookToEdit}
            onFormSubmit={handleFormSubmit}
            onCancelEdit={handleCancelForm}
          />
        </>
      )}

      {!showForm && books.length > 0 && (
        <BookList books={books} onEdit={handleEdit} onDelete={deleteBook} />
      )}
    </div>
  );
}

export default App;
