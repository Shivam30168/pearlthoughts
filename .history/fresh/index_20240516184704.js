const express = require('express');
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const cors=require('cores');
require('dotenv').config();
const app = express()

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/',(req,res)=>{
    res.send('received post request')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})