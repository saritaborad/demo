const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const userRoute = require("./routes/User");
const postRoute = require("./routes/Post");
const errorHandler = require("./utils/error");
const path = require("path");
require("dotenv").config();
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

//if i don't specify any route here it will server image at baseurl - http://localhost:3014/image1704264410021.png
// app.use(express.static(path.join(__dirname, "uploads")));

//if i specify any route here it will server image at baseurl - http://localhost:3014/image1704264410021.png
app.use("/media", express.static(path.join(__dirname, "uploads")));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", userRoute);
app.use("/post", postRoute);
app.use(errorHandler);

app.listen(PORT, () => {
 console.log(`server is listening http://localhost:${PORT}`);
});
