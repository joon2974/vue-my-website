const router = require('express').Router();
const con = require('../MySQL-conifg');

router.get('/', (req, res, next) => {
  const fetchPost = `SELECT todo, complete FROM todo`;

  con.query(fetchPost, function(err, result){
    if(err) throw err;

    res.json(JSON.parse(JSON.stringify(result)));
  })
});

router.get('/add', (req, res, next) => {
  console.log(req);
  const addQuery = `INSERT INTO todo(todo, complete) VALUES('${req.body.todoInfo.todo}', ${req.body.todoInfo.complete})`;

  con.query(addQuery, function (err, result) {
    if(err) throw err;

    res.send("complete");
  });
});

module.exports = router;
