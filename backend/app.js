const express = require('express');

const app = express();

//middleware to handle CORS issue

app.use((req, res, next) => {
  // which domains are allowed access to resource
  res.setHeader("Access-Control-Allow-Origin", "*");

  // restrict to domains sending request with a certain set of headers
  // apart from the default headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // we control which http verbs are allowed to send requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'ajd1sj213asdf',
      title: 'First server-side post',
      content: 'This is coming from server'
    },
    {
      id: 'khad23jk56hfa',
      title: 'Second server-side post',
      content: 'This is coming from server!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

module.exports = app;
