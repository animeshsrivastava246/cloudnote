const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Anni!')
})
app.get('/xy/login', (req, res) => {
  res.send('Hello Login!')
})
app.get('/xy/signup', (req, res) => {
  res.send('Hello Signup!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})