const router = require('express').Router();
const con = require('../MySQL-conifg');

//Todo Page에 접속했을 때, DB에서 데이터 fetch
router.get('/', (req, res, next) => {
  const fetchPost = `SELECT todo, complete FROM todo`;

  con.query(fetchPost, function(err, result){
    if(err) throw err;
    //그냥 res.json으로 전송하면 rowDataPacket으로 전송되므로 JSON 모듈 이용
    res.json(JSON.parse(JSON.stringify(result)));
  })
});

//Todo 앱에 추가 사항을 추가했을 때 호출되는 api
router.post('/add', (req, res, next) => {
  const addQuery = `INSERT INTO todo(todo, complete) VALUES('${req.body.todo}', ${req.body.complete})`;
  console.log(addQuery);

  con.query(addQuery, function (err, result) {
    if(err) throw err;

    res.send("complete");
  });
});

//Todo 앱에서 Todo를 지웠을 때 호출되는 api
router.post('/remove', (req, res, next) => {
  const removeQuery = `DELETE FROM todo WHERE todo='${req.body.todo}'`;
  console.log(removeQuery);

  con.query(removeQuery, function (err, result) {
    if(err) throw err;

    res.send("complete");
  });
});

//Todo 앱에서 이미 완료된 것을 완료되지 않은 상태로, 혹은 그 반대로 할때 호출되는 api
router.post('/modify', (req, res, next) => {
  var modifyQuery;

  if(req.body.method === 'undo'){
    modifyQuery = `UPDATE todo SET complete = 0 WHERE todo='${req.body.todo}' AND complete=1`;
  }else{
    modifyQuery = `UPDATE todo SET complete = 1 WHERE todo='${req.body.todo}' AND complete=0`;
  }

  console.log(modifyQuery);
  con.query(modifyQuery, function (err, result) {
    if(err) throw err;

    res.send("complete");
  });
});

module.exports = router;
