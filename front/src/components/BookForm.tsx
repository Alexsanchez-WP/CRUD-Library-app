import { useState, useEffect } from 'react';
import type { Book, BookForm as BookFormType } from '../types/Books';

interface BookFormProps {
  bookToEdit: Book | null;
  onFormSubmit: (book: BookFormType) => void;
  onCancelEdit: () => void;
}

const initialFormState: BookFormType = {
  title: '',
  description: '',
  author: '',
  pages: 0,
  year_published: 0,
  publisher: '',
};

const BookForm = ({ bookToEdit, onFormSubmit, onCancelEdit }: BookFormProps) => {
  const [form, setForm] = useState<BookFormType>(initialFormState);

  useEffect(() => {
    if (bookToEdit) {
      setForm(bookToEdit);
    } else {
      setForm(initialFormState);
    }
  }, [bookToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm: BookFormType) => ({
      ...prevForm,
      [name]: name === 'pages' || name === 'year_published' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(form);
    setForm(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{bookToEdit ? 'Editar Libro' : 'Agregar Nuevo Libro'}</h2>
      <div>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Autor</label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Autor"
          value={form.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="pages">Páginas</label>
        <input
          type="number"
          id="pages"
          name="pages"
          placeholder="Páginas"
          value={form.pages}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="publisher">Editorial</label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          placeholder="Editorial"
          value={form.publisher}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="year_published">Año de Publicación</label>
        <input
          type="number"
          id="year_published"
          name="year_published"
          placeholder="Año de Publicación"
          value={form.year_published}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button type="submit">{bookToEdit ? 'Actualizar Libro' : 'Agregar Libro'}</button>
        <button type="button" onClick={onCancelEdit} className="cancel">Cancelar</button>
      </div>
    </form>
  );
};

export default BookForm;
