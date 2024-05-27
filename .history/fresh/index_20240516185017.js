const express = require('express');
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const cors=require('cores');
require('dotenv').config();
const app = express()

const port = process.env.SERVER_PORT|| 5001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/',(req,res)=>{
    res.send(<h1>App is running successfully</h1>)
})