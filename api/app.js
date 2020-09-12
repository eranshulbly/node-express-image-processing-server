const express = require('express')
const path = require('path')

const app = express()
const pathToIndex = path.resolve(__dirname,'../client/index.html')
const router = require('./src/router')

app.use('/', router)

app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use('/*', function(req,res){
    res.sendFile(pathToIndex)
})

module.exports = app