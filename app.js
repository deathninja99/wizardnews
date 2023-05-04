const express = require("express");
var timeAgo = require("node-time-ago");
// const morgan = require("morgan");
const PostBank = require("./postBank");
const app = express();
app.use(express.static("./"));

app.get("/", (req, res) => {
  const posts = PostBank.list();

  res.send(`
  <!DOCTYPE html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="./public/style.css" />
    </head>
    <body>
      <div class = news-list>
        <header><img src="./public/logo.png" />WizardNews</header>
      </div>
    ${posts
      .map(
        (posts) => `
    <div class = "news-items">
      <p>
      <span class = "news-position">${posts.id}.<span/>
      <a href="/posts/${posts.id}">
        ${posts.title}
      </a>
      <small>(by ${posts.name})</small>
      </P>
      <small class = "news-info">
      ${posts.upvotes} upvotes | ${timeAgo(Date.now + posts.date)}
      </small>
    </div>`
      )
      .join("")}
    </body>
  </html>
`);
});

app.get("/posts/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const post = PostBank.find(id);
    res.send(`<!DOCTYPE html>
    <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="../../public/style.css" />
    </head>
    <body>
    <div class = news-list>
    <header><img src="../../public/logo.png" />WizardNews</header>
    </div>
    <a href = "../../">back to home</a>
    <p>
    ${post.title}
    <br />
    ${post.content}
    <br />
    ${post.name}
    </p>
    </body>
    </html>`);
  } catch (error) {
    throw new error("something went wrong");
    next(error);
  }
});
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
