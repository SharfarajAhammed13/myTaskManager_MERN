import Comment from '../models/comment.model.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, taskId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this comment')
      );
    }

    const newComment = new Comment({
      content,
      taskId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getTaskComments = async (req, res, next) => {
    try {
      const comments = await Comment.find({ taskId: req.params.taskId }).sort({
        createdAt: -1,
      });
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  };