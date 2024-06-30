const HttpError = require("../models/errorModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");
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
            creator: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("게시글을 생성할 수 없습니다.", 400));
          }

          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
}

// Get All Post
async function getPosts(req, res, next) {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
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

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    return next(new HttpError(error));
  }
}

// Get Single Post
async function getPost(req, res, next) {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("게시글을 찾을 수 없습니다.", 400));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// =============
// Get Post Category
// =============
async function categoryPost(req, res, next) {
  try {
    const { category } = req.params;
    const catPost = await Post.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(catPost);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// Delete Post
async function deletePost(req, res, next) {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("게시글이 없습니다.", 400));
    }
    const post = await Post.findById(postId);
    const fileName = post?.thumbnail;

    if (req.user.id == post.creator) {
      fs.unlink(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          } else {
            await Post.findByIdAndDelete(postId);

            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser?.posts - 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
            res.json("게시글이 삭제되었습니다.");
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

// Edit Post
async function editPost(req, res, next) {
  try {
    let fileName;
    let newFilename;
    let updatedPost;

    const postId = req.params.id;
    let { title, category, content } = req.body;

    if (!title || !category || content.length < 10) {
      return next(new HttpError("모든 필드를 입력해 주세요.", 422));
    }

    const prevPost = await Post.findById(postId);
    if (req.user.id == prevPost.creator) {
      if (!req.files) {
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
            title,
            category,
            content,
          },
          { new: true }
        );
      } else {
        fs.unlink(
          path.join(__dirname, "..", "uploads", prevPost.thumbnail),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        const { thumbnail } = req.files;
        fileName = thumbnail.name;
        let splitted = fileName.split(".");
        newFilename =
          splitted[0] + uuid() + "." + splitted[splitted.length - 1];
        thumbnail.mv(
          path.join(__dirname, "..", "uploads", newFilename),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );

        updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
            title,
            category,
            content,
            thumbnail: newFilename,
          },
          { new: true }
        );
      }
    }
    if (!updatedPost) {
      return next(new HttpError("게시글을 수정할 수 없습니다.", 400));
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    return next(new HttpError(error));
  }
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  categoryPost,
  deletePost,
  editPost,
};
