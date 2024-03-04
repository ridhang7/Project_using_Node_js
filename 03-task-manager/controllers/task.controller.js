const Task = require('../models/task.models')
const asyncWrapper = require('../middleware/asyncWrapper')
const { createCustomError } = require('../errors/custom-error')

const getAllTaskList = asyncWrapper (async (req, res) => { 
        const tasks = await Task.find({})
        res.status(200).json({tasks})
})

const createTaskItem = asyncWrapper ( async (req, res) => { 
        const task = await Task.create(req.body)
        res.status(201).json({task})    
})

const getTaskItem = asyncWrapper ( async (req, res) => { 
        const {taskId} = req.params
        const taskItem = await Task.findOne({_id: taskId})
        res.status(200).json({taskItem})
})

const updateExistingTask = asyncWrapper ( async (req, res, next) => {
    const {taskId} = req.params
        const taskItem = await Task.findByIdAndUpdate(taskId, req.body, 
            {new: true, runValidators: true})
            console.log(taskItem);
        //new - returns the updated item
        if (!taskItem) {
            return next(createCustomError(`No task with id : ${req.params.taskId}`, 404))
          }
            
            // return res.status(404).json({msg: "no Task with the given object ID", tasks})        
        return res.status(200).json({taskItem})
})

const deleteTask = asyncWrapper ( async (req, res) => {
        const taskItem = await Task.findByIdAndDelete(req.params.taskId)
        const tasks = await Task.find({})
        if (!taskItem) {
            return res.status(200).json({"isSuccess":true, tasks })
        }
        else {
            return res.status(404).json({msg: "no Task with the given object ID", tasks})
        }
})

module.exports = {getAllTaskList, 
    createTaskItem, 
    getTaskItem, 
    updateExistingTask, 
    deleteTask
}


