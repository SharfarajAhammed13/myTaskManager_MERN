import Task from '../models/task.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a task'));
    }

    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

    const newTask = new Task({
        ...req.body,
        slug,
        userId: req.user.id,
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
      } catch (error) {
        next(error);
      }
}

export const gettasks = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const tasks = await Task.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.priority && { priority: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.taskId && { _id: req.query.taskId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const totalTasks = await Task.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthTasks = await Task.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        tasks,
        totalTasks,
        lastMonthTasks,
      });
    } catch (error) {
      next(error);
    }
  };

  export const deletetask = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this Task'));
    }
    try {
      await Task.findByIdAndDelete(req.params.taskId);
      res.status(200).json('The task has been deleted');
    } catch (error) {
      next(error);
    }
  };

  export const updatetask = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this task'));
    }
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.taskId,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            priority: req.body.priority,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  };