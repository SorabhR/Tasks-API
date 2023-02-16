const Task = require('../models/task')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAlltasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length })
}
const gettask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req

  const task = await Task.findOne({
    _id: taskId,
    createdBy: userId,
  })
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`)
  }
  res.status(StatusCodes.OK).json({ task })
}

const createtask = async (req, res) => {
  req.body.createdBy = req.user.userId
  const task = await Task.create(req.body)
  res.status(StatusCodes.CREATED).json({ task })
}

const updatetask = async (req, res) => {
  const {
    body: { taskname, status },
    user: { userId },
    params: { id: taskId },
  } = req

  if (taskname === '') {
    throw new BadRequestError('Task name cannot be empty')
  }
  const task = await Task.findByIdAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`)
  }
  res.status(StatusCodes.OK).json({ task })
}

const deletetask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req

  const task = await Task.findByIdAndRemove({
    _id: taskId,
    createdBy: userId,
  })
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  createtask,
  deletetask,
  getAlltasks,
  updatetask,
  gettask,
}
