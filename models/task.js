const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    taskname: {
      type: String,
      required: [true, 'Please provide task'],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ['completed', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Task', TaskSchema)
