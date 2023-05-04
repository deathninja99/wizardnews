//requirements
const express = require("express");
// const morgan = require("morgan");
const app = express();

app.use(express.static("./"));
// Middleware
app.use((req, res, next) => {
  console.log(`middlewareblob`);
  next();
});
// Routes
app.use("/", require("./routes"));

app.use((error, req, res, next) => {
  console.log(error);
  res.send(error);
});

// Catch All
app.get("*", (req, res, next) => {
  res.status(404).send("Oops, that endpoint doesn't exist!");
});
const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
