require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const employers = require("./src/routers/employers");
const applicants = require("./src/routers/applicants");
const jobList = require("./src/routers/jobList");
const roles = require("./src/routers/roles");
const auth = require("./src/routers/auth");
const bodyParser = require("body-parser");
const multer = require("multer");
const File = require("./src/models/File");

const connectDB = require("./src/db/db");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(upload());

app.use("/api", jobList);

app.use("/employers", employers);
app.use("/applicants", applicants);
app.use("/roles", roles);
app.use("/auth", auth);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).send({ status: 404, msg: "An error has occurred" });
  }
  next();
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
