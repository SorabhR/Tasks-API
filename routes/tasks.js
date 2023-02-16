const express = require('express')

const router = express.Router()
const {
  createtask,
  deletetask,
  getAlltasks,
  updatetask,
  gettask,
} = require('../controllers/tasks')

router.route('/').post(createtask).get(getAlltasks)

router.route('/:id').get(gettask).delete(deletetask).patch(updatetask)

module.exports = router
