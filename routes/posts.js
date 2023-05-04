const express = require("express");
const postRoute = express.Router();
var timeAgo = require("node-time-ago");
const router = require(".");
const postBank = require("../postBank");

postRoute.get("/", (req, res) => {
  let posts = postBank.list("");
  res.send(`
    <!DOCTYPE html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="../public/style.css" />
      </head>
      <body>
        <div class = news-list>
          <header><img src="../public/logo.png" />WizardNews</header>
        </div>
      ${posts
        .map(
          (posts) => `
      <div class = "news-items">
        <p>
        <span class = "news-position">${posts.id}.<span/>
        <a href="/${posts.id}">
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

postRoute.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const post = postBank.find(id);
    res.send(`<!DOCTYPE html>
      <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="../../../public/style.css" />
      </head>
      <body>
      <div class = news-list>
      <header><img src="../../../public/logo.png" />WizardNews</header>
      </div>
      <a href = "./">back to home</a>
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
    console.log(error);
    res.send(error);
    next(error);
  }
});

module.exports = postRoute;
