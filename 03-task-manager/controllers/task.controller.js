const Task = require('../models/task.models')


const getAllTaskList = async (req, res) => { 
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks}) 
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
const createTaskItem = async (req, res) => { 
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})    
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
const getTaskItem = async (req, res) => { 
    try {
        const {taskId} = req.params
        const taskItem = await Task.findOne({_id: taskId})
        // check why this logic isnt working as expected -> body should not have existing id and response should throw error
        // if(!taskItem){ 
        //     return res.status(404).json({msg: `${req.params.taskId} doesn't exist`})
        // }
        res.status(200).json({taskItem})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
const updateExistingTask = async (req, res) => {
    try {
        const {taskId} = req.params
        await Task.findByIdAndUpdate(taskId, req.body, 
            {new: true, runValidators: true})
        //new - returns the updated item
        const taskItem = await Task.findOne({_id: taskId})
        const tasks = await Task.find({})
        if (taskItem != null) {
            return res.status(200).json({taskItem})
        }
        else {
            return res.status(404).json({msg: "no Task with the given object ID", tasks})
        }
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
const deleteTask = async (req, res) => {
    try {
        const taskItem = await Task.findByIdAndDelete(req.params.taskId)
        const tasks = await Task.find({})
        if (!taskItem) {
            return res.status(200).json({"isSuccess":true, tasks })
        }
        else {
            return res.status(404).json({msg: "no Task with the given object ID", tasks})
        }
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {getAllTaskList, 
    createTaskItem, 
    getTaskItem, 
    updateExistingTask, 
    deleteTask
}


