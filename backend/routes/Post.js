const express = require("express");
const { getAllPost, addPost, deletePost, editPost } = require("../controllers/Post");
const authenticate = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/list", getAllPost);
router.post("/create", authenticate, upload.single("image"), addPost);
router.post("/delete", authenticate, deletePost);
router.post("/edit", authenticate, upload.single("image"), editPost);

module.exports = router;
