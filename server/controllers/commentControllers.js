const Comment = require("../models/commentModel");
const HttpError = require("../models/errorModel");

// Create Comment
async function createComment(req, res, next) {
  try {
    let { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(new HttpError("댓글을 작성할 수 없습니다.", 403));
    }

    const newComment = await Comment.create({
      content,
      postId,
      userId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// Get Comment
async function getComment(req, res, next) {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    return next(new HttpError(error));
  }
}

module.exports = { createComment, getComment };
