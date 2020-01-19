const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.send('훌륭합니다.')
});
app.use('/boardData', require('./boardData'));

module.exports = {
  path: 'api',
  handler: app
};
