const express = require("express");
const path = require("path");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const mongoStore = require("connect-mongo");


const homePostController = require("./controllers/homePost");
const getPostController = require("./controllers/getPost");
const postsNewController = require("./controllers/postNew");
const createPostController = require("./controllers/createPost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/userStore");
const loginController = require("./controllers/login");
const loginStoreController = require("./controllers/loginStore");
const storePostMiddleware = require("./middleware/storePost");

const app = express();

const authMiddleware = require("./middleware/auth")


const MongoUrl = "mongodb+srv://azizbekjon:4B7I6zqkZocYDbl6@cluster0.q2jib.mongodb.net/node-blog-izzy";

mongoose.connect(MongoUrl);

app.use(expressSession({
  secret: "azizbek",
  store: mongoStore.create({mongoUrl: MongoUrl})
}));



app.use(fileUpload());
app.use(fileUpload())

app.use(express.static("public"));
app.use(expressEdge.engine);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("views", `${__dirname}/views`);


app.get("/", homePostController);
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleware, postsNewController);
app.post("/posts/create", authMiddleware, storePostMiddleware, createPostController);
app.get("/reg", createUserController);
app.post("/auth/reg", storeUserController);
app.get("/login", loginController);
app.post("/auth/log", loginStoreController);

app.listen(5000, () => {console.log("http://localhost:5000 Server has been started on Port 5000...")});