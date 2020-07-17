const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

//remove retryWrites=true if you get a circular dependency error on the node js side
const connectionUrl = "mongodb+srv://sandeep:Uo7IBBmJDTfSsPuz@cluster0.ldtvf.mongodb.net/node-angular?retryWrites=true&w=majority";
const connectionConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(connectionUrl, connectionConfig)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

//middleware to parse the json object and add it as body to response
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

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
app.use('/api/user', userRoutes);
module.exports = app;
