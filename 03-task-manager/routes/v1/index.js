const express = require('express');
const app = express()
// tasks has information about the task.route file and all get, post, etc methods
const tasks = require('./task.route')
// fro tasks routes
app.use('/tasks', tasks)

//for users routes
app.use('/user', tasks)

module.exports = app
