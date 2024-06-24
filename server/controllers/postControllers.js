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

module.exports = { createPost };
