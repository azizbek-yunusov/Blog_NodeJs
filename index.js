const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
// sessionni mongoDBga ulash
const mongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");

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

const authMiddleware = require("./middleware/auth");

const MongoUrl =
  "mongodb+srv://azizbekjon:4B7I6zqkZocYDbl6@cluster0.q2jib.mongodb.net/node-blog-izzy";

mongoose.connect(MongoUrl);

app.use(
  expressSession({
    // key beriladi ixtiyoriy nom
    secret: "azizbek",
    store: mongoStore.create({ mongoUrl: MongoUrl }),
  })
);
// fayl rasm kabilarni yuklash uchun o'rnatiladigan kutubxona
app.use(fileUpload());

app.use(express.static("public"));
// html uchun provider kutubxonasi
app.use(expressEdge.engine);
// ma'lumotlarni json orqali olish uchun buni yozish shart
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(connectFlash());

app.set("views", `${__dirname}/views`);

app.get("/", homePostController);
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleware, postsNewController);
app.post(
  "/posts/create",
  authMiddleware,
  storePostMiddleware,
  createPostController
);
app.get("/reg", createUserController);
app.post("/auth/reg", storeUserController);
app.get("/login", loginController);
app.post("/auth/log", loginStoreController);

app.listen(5000, () => {
  console.log("http://localhost:5000 Server has been started on Port 5000...");
});
