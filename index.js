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
const logoutController = require("./controllers/logout");

// Middleware
const storePostMiddleware = require("./middleware/storePost");
const authMiddleware = require("./middleware/auth");
const redirectIfAuth = require("./middleware/redirect");

const app = express();

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

app.use((req, res, next) => {
  app.locals.auth = req.session.userId;
  next();
});
app.get("/", homePostController);
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleware, postsNewController);
app.post(
  "/posts/create",
  authMiddleware,
  storePostMiddleware,
  createPostController
);
app.get("/reg", redirectIfAuth, createUserController);
app.post("/auth/reg", storeUserController);
app.get("/login", redirectIfAuth, loginController);
app.post("/auth/log", loginStoreController);
app.get("/logout", authMiddleware, logoutController);
app.use((req, res) => res.render("not_found"));

app.listen(5000, () => {
  console.log("http://localhost:5000 Server has been started on Port 5000...");
});
