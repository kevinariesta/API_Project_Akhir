const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const port = 1995;

var app = express();
var url = bodyParser.urlencoded({ extended: false });
var encrypter = bodyParser.json();

app.use(url);
app.use(encrypter);
app.use(cors());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'saitama',
    password: '123456',
    database: 'warungwmm',
    port: 3306
});

app.get('/login', (req,res) => {
    const { email, password } = req.query;
    var data = {
        email: email,
        password: password
    };
    var sql = `select * from userdata WHERE email = '${email}' AND password = '${password}';`;
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        res.send(results);
        console.log(results);
    })
})

app.post('/register', (req,res) => {
    const { username, email, password } = req.body;
    var data = {
        username: username,
        email: email,
        password: password
    };
    var sql = `INSERT INTO userdata SET ?;`;
    conn.query(sql, data, (err,results) => {
        if(err) throw err;
        res.send(data);
    })
})

app.listen(port, () => console.log(`WMM app listening on port ${port}!`));