import express from "express";
import cors from "cors";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = "db.json";

app.use(cors());
app.use(express.json());

async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return { books: [] };
    }
    console.error("Error leyendo la base de datos:", error);
    throw error;
  }
}

async function writeDB(data) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error escribiendo en la base de datos:", error);
    throw error;
  }
}

app.get("/books", async (_, res) => {
  try {
    const db = await readDB();
    res.json(db.books || []);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo libros" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const db = await readDB();
    const book = db.books.find((b) => b.id === req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Libro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo libro" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const db = await readDB();
    const newBook = {
      ...req.body,
      id: uuidv4(),
    };
    db.books.push(newBook);
    await writeDB(db);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error agregando libro" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const db = await readDB();
    const bookId = req.params.id;
    const bookIndex = db.books.findIndex((b) => String(b.id) === bookId);

    if (bookIndex !== -1) {
      const updatedBook = {
        ...db.books[bookIndex],
        ...req.body,
        id: db.books[bookIndex].id,
      };

      db.books[bookIndex] = updatedBook;
      console.log("Libro actualizado:", updatedBook);
      await writeDB(db);
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: "Libro no encontrado para actualizar" });
    }
  } catch (error) {
    console.error("Error actualizando libro:", error);
    res.status(500).json({ message: "Error actualizando libro" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const db = await readDB();
    const bookIndex = db.books.findIndex((b) => b.id === req.params.id);
    if (bookIndex !== -1) {
      db.books.splice(bookIndex, 1);
      await writeDB(db);
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Libro no encontrado para eliminar" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error eliminando libro" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
