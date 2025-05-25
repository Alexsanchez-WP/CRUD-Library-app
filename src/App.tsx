import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', author: '' });

  const fetchBooks = async () => {
    const res = await axios.get('/api/books');
    setBooks(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/books/${id}`);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditing(book.id);
    setForm({ title: book.title, author: book.author });
  };

  const handleUpdate = async () => {
    await axios.put(`/api/books/${editing}`, form);
    setEditing(null);
    setForm({ title: '', author: '' });
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
      <h1>Library CRUD</h1>
      {books.map((book) => (
        <div key={book.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <button onClick={() => handleEdit(book)}>Edit</button>
          <button onClick={() => handleDelete(book.id)}>Delete</button>
        </div>
      ))}

      {editing && (
        <div>
          <h2>Edit Book</h2>
          <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}

export default App;