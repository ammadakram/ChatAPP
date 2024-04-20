import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for Save a new book
router.post("/", async (request, response) => {
  const { title, author, publishYear } = request.body;
  try {
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }

  const newBook = {
    title: title,
    author: author,
    publishYear: publishYear,
  };
  const book = await Book.create(newBook);
  return response.status(201).send({ book });
});

// Route to get all the books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send({ count: books.length, books: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get the book by id
router.get("//:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to update a book
router.put("/:id", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).json({ message: "book not found" });
    }
    res.status(200).send({ message: "Book updated!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

// route to delete book
router.delete("/:id", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id, req.body);
    if (!result) {
      res.status(404).json({ message: "book not found" });
    }
    res.status(200).send({ message: "Book deleted!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

export default router;
