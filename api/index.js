const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
  res.send('훌륭합니다.')
});

app.use('/boardData', require('./boardData'));
app.use('/todo', require('./todo'));

module.exports = {
  path: 'api',
  handler: app
};
