const Books = require("../models/Books");
const BooksModel = require("../models/Books");

const seedBooks = async (req, res) => {
  try {
    await BooksModel.deleteMany({});

    await BooksModel.create([
      {
        _id: "64d0f3f75676c304033d8c89",
        title: "Interview With a Vampire",
        author: "Anne Rice",
        year_published: 1976,
      },
      {
        _id: "64d0f3f75676c304033d8c8a",
        title: "IT",
        author: "Stephen King",
        year_published: 1986,
      },
      {
        _id: "64d0f3f75676c304033d8c8b",
        title: "The Hobbit",
        author: "J.R.R. Tolkin",
        year_published: 1996,
      },
      {
        _id: "64d0f3f75676c304033d8c8e",
        title: "Murder on the Orient Express",
        author: "Agatha Christie",
        year_published: 1934,
      },
      {
        _id: "64d0f3f75676c304033d8c8c",
        title: "Dune",
        author: "Frank Herbert",
        year_published: 1965,
      },
      {
        _id: "64d0f3f75676c304033d8c8d",
        title: "Gone Girl",
        author: "Gillian Flynn",
        year_published: 2012,
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await BooksModel.find();
    res.json(allBooks);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting books" });
  }
};

const getBookById = async (req, res) => {
  try {
    // const book = await BooksModel.findById(req.body.id);
    const book = await BooksModel.findOne({ _id: req.body.id });
    // const book = await BooksModel.find({});
    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting books" });
  }
};

// const addNewBook = async (req, res) => {
//   try {
//     const newBook = {
//       title: req.body.title,
//       author: req.body.author,
//       year_pbulished: req.body.year,
//     };

//     await BooksModel.create(newBook);
//     res.json({ status: "ok", msg: "book saved" });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", msg: "error saving books" });
//   }
// };

const addNewBook = async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      year_published: req.body.year,
    };

    const newBookModel = new BooksModel(newBook);
    await newBookModel.save();

    res.json({ status: "ok", msg: "book saved" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error saving books" });
  }
};

const deleteOneBookById = async (req, res) => {
  try {
    await BooksModel.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "book deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error deleting book" });
  }
};

const updateOneBook = async (req, res) => {
  try {
    const updateBook = {
      title: req.body.title,
      author: req.body.author,
      year_published: req.body.year,
    };
    // const updateBook = {};
    // if ("title" in req.body) updateBook.title = req.body.title;
    // if ("author" in req.body) updateBook.author = req.body.author;
    // if ("year" in req.body) updateBook.year_published = req.body.year;
    await BooksModel.findByIdAndUpdate(req.params.id, updateBook);
    res.json({ status: "ok", msg: "book updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error updating book" });
  }
};

module.exports = {
  seedBooks,
  getAllBooks,
  getBookById,
  addNewBook,
  deleteOneBookById,
  updateOneBook,
};
