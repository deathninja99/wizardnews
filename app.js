const express = require("express");
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
      ${posts.upvotes} upvotes | ${posts.data}
      </small>
    </div>`
      )
      .join("")}
    </body>
  </html>
`);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = PostBank.find(id);
  if (!post.id) {
    res.status(404);
    res.send(404);
  }
  res.send(`<!DOCTYPE html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="./public/style.css" />
  </head>
  <body>
  <p>
  ${post.title}
  <br />
  ${post.name}
  </p>
  </body>
</html>`);
});
const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
