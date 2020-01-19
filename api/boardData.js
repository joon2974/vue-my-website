const router = require('express').Router();
const con = require('../MySQL-conifg');

router.get('/', (req, res, next) => {
  const fetchPost = `SELECT author, title, date FROM post`;

  con.query(fetchPost, function(err, result){
    if(err) throw err;

    res.json(JSON.parse(JSON.stringify(result)));
  })
});

module.exports = router;
