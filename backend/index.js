import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from "cors";


const app = express();


// middleware for parsing request body
app.use(express.json());

// middleware for handling cors policy
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);


app.get("/", (request, response) => {
  // console.log(request);
  return response.status(234).send("Welcome too MERN stack");
});

// middleware
app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
