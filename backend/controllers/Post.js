const { asyncHandler, giveresponse } = require("../utils/res_help");
const Post = require("../models/Post");
const deleteFile = require("../utils/commonFunc");

exports.getAllPost = asyncHandler(async (req, res, next) => {
 const { page, sizePerPage } = req.body;
 const currentPage = page || 1;
 const limit = sizePerPage || 10;
 const skip = (currentPage - 1) * limit;
 const posts = await Post.find().skip(skip).limit(limit);
 if (!posts) return giveresponse(res, 404, false, "Post not found");
 return giveresponse(res, 200, true, "Post get success", posts);
});

exports.addPost = asyncHandler(async (req, res, next) => {
 const { title, description } = req.body;
 const post = await Post.create({ title, description, image: req.file.filename });
 return giveresponse(res, 200, true, "Post added success");
});

exports.deletePost = asyncHandler(async (req, res, next) => {
 const { _id } = req.body;
 const post = await Post.findOne({ _id });
 if (!post) return giveresponse(res, 404, false, "Post not found");
 deleteFile(post.image);
 await post.deleteOne({ _id });
 return giveresponse(res, 200, true, "Post deleted success");
});

exports.editPost = asyncHandler(async (req, res, next) => {
 const { _id, title, description } = req.body;

 const post = await Post.findOne({ _id });
 if (!req.file) {
  await post.updateOne({ title, description });
 } else {
  deleteFile(post.image);
  await post.updateOne({ title, description, image: req.file.filename });
 }
 return giveresponse(res, 200, true, "Post updated success");
});
