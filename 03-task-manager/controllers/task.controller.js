const Task = require('../models/task.models')
const asyncWrapper = require('../middleware/asyncWrapper')

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
        const { taskId} = req.params
        const taskItem = await Task.findOneAndUpdate({taskId} , req.body, 
            {new: true, runValidators: true})
        //new - returns the updated item
        if (!taskItem){
            const error = new Error('Not Found');                     
            error.status=404;
            return next(error);
        }
            
            // return res.status(404).json({msg: "no Task with the given object ID", tasks})        
        // return res.status(200).json({taskItem})
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


