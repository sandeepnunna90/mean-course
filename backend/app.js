const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

const db = "mongodb+srv://sandeep:Uo7IBBmJDTfSsPuz@cluster0.ldtvf.mongodb.net/node-angular?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

//middleware to parse the json object and add it as body to response
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middleware to handle CORS (Cross Origin Resource Sharing) issue
app.use((req, res, next) => {
  // which domains are allowed access to resource
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );

  // restrict to domains sending request with a certain set of headers
  // apart from the default headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  // we control which http verbs are allowed to send requests
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, OPTIONS, DELETE'
  );

  next();
});

app.use('/api/posts', postsRoutes);
module.exports = app;
