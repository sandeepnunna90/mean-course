const express = require('express');

const app = express();

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
