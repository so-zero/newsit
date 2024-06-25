const HttpError = require("../models/errorModel");
const Post = require("../models/postModel");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

// Create Post
async function createPost(req, res, next) {
  try {
    let { title, category, content } = req.body;

    if (!req.user.isAdmin) {
      return next(new HttpError("게시글을 작성할 수 없습니다.", 403));
    }

    if (!title || !category || !content || !req.files) {
      return next(new HttpError("모든 필드를 입력해 주세요.", 400));
    }

    const slug = title.split(" ").join("-").toLowerCase();

    const { thumbnail } = req.files;
    let fileName = thumbnail.name;
    let splitted = fileName.split(".");
    let newFilename =
      splitted[0] + uuid() + "." + splitted[splitted.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await Post.create({
            title,
            category,
            content,
            slug,
            thumbnail: newFilename,
            userId: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("게시글을 생성할 수 없습니다.", 400));
          }
          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
}

async function getPosts(req, res, next) {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find()
      .sort({ updateAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json(posts, totalPosts, lastMonthPosts);
  } catch (error) {
    return next(new HttpError(error));
  }
}

async function deletePost(req, res, next) {
  try {
    if (!req.user.isAdmin) {
      return next(new HttpError("게시글을 삭제할 수 없습니다.", 403));
    }

    const post = await Post.findById(req.params.postId);
    const fileName = post?.thumbnail;

    if (req.user.isAdmin) {
      fs.unlink(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          } else {
            await Post.findByIdAndDelete(req.params.postId);
          }
        }
      );
    } else {
      return next(new HttpError("게시글을 삭제할 수 없습니다.", 403));
    }
  } catch (error) {
    return next(new HttpError(error));
  }
}

module.exports = { createPost, getPosts, deletePost };
