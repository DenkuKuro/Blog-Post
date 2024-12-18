import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];
let id = 0;

app.post("/posts", (req, res) => {
    const post = req.body;
    const postObject = {
        author: post.author,
        title: post.title,
        content: post.content,
        id: id 
    };
    posts.push(postObject);
    // console.log(postObject);
    console.log(posts);
    res.render("posts.ejs", {
        posts
    });

    id++;
});

app.delete("/posts/:id", (req, res) => {
    posts.pop()
});

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/post", (req, res) => {
    res.render("post.ejs");
});

app.get("/posts", (req, res) => {
    res.render("posts.ejs",  { posts });
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.listen(port, () => {
    console.log(`Server up on http://localhost:${port}`);
});