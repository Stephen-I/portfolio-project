const express = require("express");
const app = express();

const {
  viewCategories,
  getMessage,
} = require("./controllers/category.controller");

const {
  viewReviewsById,
  notFoundErr,
} = require("./controllers/review.controller");

app.use(express.json());

app.get("/api", getMessage);

app.get("/api/categories", viewCategories);

app.get("/api/reviews/:review_id", viewReviewsById);

app.get("/*", notFoundErr);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: err.message || "Bad Request" });
  } else {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;