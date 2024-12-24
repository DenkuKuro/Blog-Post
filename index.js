import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000/posts";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));


app.post("/create/posts", async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body);
        console.log(response.data);
        res.redirect("/posts");
    } catch (error) {
        res.status(500).json({ error: "Error creating post" });
    }
});

app.get("/posts/delete/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        await axios.delete(`${API_URL}/${req.params.id}`);
        res.redirect("/posts");
    } catch (error) {
        res.status(500).json({ error: "Error deleting post "});
    }
});

app.post("/posts/:id", async (req, res) => {
    try {
        const response = await axios.patch(`${API_URL}/${req.params.id}`, req.body);
        console.log(response.data);
        res.redirect("/posts");
    } catch (error) {
        res.status(500).json({ error: "Error updating post"});
    }
});

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/posts", async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.render("posts.ejs", { posts: response.data });
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts"})
    }
});

app.get("/post/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/${req.params.id}`);
        res.render("post.ejs", { post: response.data });
    } catch (error) {
        res.status(500).json({ error: "Error fetching post "});
    }
});

app.get("/post", (req, res) => {
    res.render("post.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.listen(port, () => {
    console.log(`Server up on http://localhost:${port}`);
});