const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const port = 3001

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body;
    TodoModel.findByIdAndUpdate(id, { done }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/add', (req, res) => {
    const { task } = req.body;
    TodoModel.create({ task, done: false })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});