const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET →  Lấy về dữ liệu của toàn bộ users
app.get("/api/v1/users", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    res.json({ users });
  } catch (error) {
    console.log(error);
  }
});

// GET →  Lấy về dữ liệu của một user
app.get("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    const user = users.find((user) => user.id === +id);
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
});
// POST →  Thêm mới dữ liệu về 1 users vào trong CSDL
app.post("/api/v1/users", (req, res) => {
  const { name, username, email, address, phone, website, company } = req.body;

  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    const newUser = {
      id: users[users.length - 1].id + 1,
      name,
      username,
      email,
      address,
      phone,
      website,
      company,
    };
    users.push(newUser);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.json({ users });
  } catch (error) {
    console.log(error);
  }
});
// PUT →  Chỉnh sửa dữ liệu của 1 user (email)
app.put("/api/v1/users/:id", (req, res) => {
  const { name, username, email, address, phone, website, company } = req.body;
  const findUserId = req.params.id;
  console.log(findUserId);
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    const findUser = users.find((user) => user.id === +findUserId);
    const updateUser = {
      id: +findUserId,
      name,
      username,
      email,
      address,
      phone,
      website,
      company,
    };
    const newUser = { ...findUser, ...updateUser };
    console.log(newUser);
    const newUsers = users.map((user) =>
      user.id === +findUserId ? newUser : user
    );
    // console.log(newUsers);
    fs.writeFileSync("./data/users.json", JSON.stringify(newUsers));
    res.json({ users: newUsers });
  } catch (error) {
    console.log(error);
  }
});

// DELETE	 →  Xoá dữ liệu về một user

app.delete("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    const newUsers = users.filter((user) => user.id !== +id);
    res.json({ users: newUsers });
    fs.writeFileSync("./data/users.json", JSON.stringify(newUsers));
  } catch (error) {
    console.log(error);
  }
});
// GET →  Lấy về dữ liệu của một post
app.get("/api/v1/posts/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf8"));
    const post = posts.find((user) => user.id === +id);
    res.json({ post });
  } catch (error) {
    console.log(error);
  }
});
// GET →  Lấy về dữ liệu của toàn bộ post
app.get("/api/v1/posts", (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf8"));
    res.json({ posts });
  } catch (error) {
    console.log(error);
  }
});
// POST →  Thêm mới dữ liệu về 1 post vào trong CSDL
app.post("/api/v1/posts", (req, res) => {
  const { userId, title, body } = req.body;

  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf8"));
    const newPost = {
      id: posts[posts.length - 1].id + 1,
      userId,
      title,
      body,
    };
    posts.push(newPost);
    fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
    res.json({ posts });
  } catch (error) {
    console.log(error);
  }
});
// PUT →  Chỉnh sửa dữ liệu của 1 post ()
app.put("/api/v1/posts/:id", (req, res) => {
  const { userId, title, body } = req.body;
  const findPostId = req.params.id;
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf8"));
    const findPost = posts.find((post) => post.id === +findPostId);
    console.log(findPost);
    const updatePost = {
      id: +findPostId,
      userId,
      title,
      body,
    };
    const newPost = { ...findPost, ...updatePost };
    const newPosts = posts.map((post) =>
      post.id === +findPostId ? newPost : post
    );
    fs.writeFileSync("./data/users.json", JSON.stringify(newPosts));
    res.json({ posts: newPosts });
  } catch (error) {
    console.log(error);
  }
});
// DELETE	 →  Xoá dữ liệu về một post

app.delete("/api/v1/posts/:id", (req, res) => {
  const { id } = req.params;
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf8"));
    const newPosts = posts.filter((user) => user.id !== +id);
    res.json({ posts: newPosts });
    fs.writeFileSync("./data/posts.json", JSON.stringify(newPosts));
  } catch (error) {
    console.log(error);
  }
});

// get lấy tất cả bài post của 1 user

app.get("/api/v1/users/:userId/posts", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf8"));
    const postsUser = posts.filter((post) => post.userId === +userId);
    postsUser
      ? res.json({ posts: postsUser })
      : res.json({ message: "not found" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
