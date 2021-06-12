const { response } = require('express');
const express = require('express')

const app = express();

app.listen(5000, function () {
    console.log('App on port 5000')
})

app.get('/', (req, res) => {
    res.send('<h1>This is the home page</h1>')
})

app.get('/mean', (req, res) => {
    res.send('route')
})

app.get('/median', (req, res) => {
    res.send('route')
})

app.get('/mode', (req, res) => {
    res.send('route')
})

