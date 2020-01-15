const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://matheus:matheus1234@cluster0-fudxp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

// Query params: req.query
// Route params: req.params
// Body: req.boy

app.use(express.json()); // For express understand JSON
app.use(routes); // To join the routes with the file

app.listen(3333);
