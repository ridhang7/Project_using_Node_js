const express = require('express');
const router = express.Router()
const {getAllTaskList, 
    createTaskItem, 
    getTaskItem, 
    updateExistingTask, 
    deleteTask} = require('../../controllers/task.controller');

router.route('/').get(getAllTaskList).post(createTaskItem)
router.route('/:taskId').get(getTaskItem).patch(updateExistingTask).delete(deleteTask)

module.exports = router
