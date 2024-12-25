import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let id = 0;

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    res.json(post);
});

app.post("/posts", (req, res) => {
    const post = req.body;
    const postObject = {
        author: post.author,
        title: post.title,
        content: post.content,
        id: ++id,
    };
    posts.push(postObject);
    console.log(posts.slice(-1));
    res.json(postObject);
});

app.patch("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const modifiedPost = req.body;
    const postToUpdate = posts.find((post) => post.id === id);
    if (!postToUpdate) return res.sendStatus(404).json({
        error: "Post not found"
    });

    if (modifiedPost.author) postToUpdate.author = modifiedPost.author;
    if (modifiedPost.title) postToUpdate.title = modifiedPost.title;
    if (modifiedPost.content) postToUpdate.content = modifiedPost.content;

    res.json(postToUpdate);
});


app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const foundIndex = posts.findIndex((post) => post.id === id);
    if (foundIndex > -1) {
        posts.splice(foundIndex, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404).json( { error: "Post not found" } );
    }
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});