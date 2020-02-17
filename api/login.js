const router = require('express').Router();
const con = require('../MySQL-conifg');
const jwt = require('jsonwebtoken');
const secretObj = require('../jwtConfig');

router.post('/', (req, res, next) => {
  const loadCredential = `SELECT password, type FROM user WHERE id='${req.body.id}';`;
  const password = req.body.password;

  con.query(loadCredential, function (err, result) {
    if(err) throw err;

    let token = jwt.sign({
        email: req.body.id,
        type: result[0].type
      },
      secretObj.secret ,    // 비밀 키
      {
        expiresIn: '60m'    // 유효 시간은 5분
      });

    console.log(result);
    if(result.length !== 0){
      console.log("검색 정보 있음");
      const dbPassword = result[0].password;
      const dbUserType = result[0].type;
      const beforeURL = res.req.headers.referer;
      const goto = '/' + beforeURL.split('/').reverse()[0];

      if(dbPassword === password && dbUserType === 'admin'){
        console.log("로그인 확정");
        res.cookie('JWT', token, {
          httpOnly: true,
        });
        res.json({code: 'complete', url: goto});
      }else{
        console.log("비번 틀림");
        res.json({code: 'not allowed', url: goto});
      }
    }else{
      console.log("가입 필요");
      res.json({code: 'no user', url: goto});
    }
  });
});

module.exports = router;
