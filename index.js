const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const port = 2018;

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

app.get('/', (req,res) => {
    res.send('<h1>API WMM Active!!!</h1>');
})

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
        // console.log(results);
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
        // console.log(data);
    })
});

app.get('/keeplogin', (req,res) => {
    const { email } = req.query;
    var data = {
        email: email,
    };
    var sql = `select * from userdata WHERE email = '${email}';`;
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        res.send(results);
        // console.log(results);
    })
});

app.get('/listmenu', (req,res) => {
    var sql1 = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                from daftarmenu d join kategori k
                on d.idkategori = k.id;`;
    var sql2 = `select * from kategori;`;
    conn.query(sql1, (err1, results1) => {
        if(err1) throw err1;
        // console.log(results1);

        conn.query(sql2, (err2, results2) => {
            if(err2) throw err2;
            res.send({ daftarmenu: results1, kategori: results2 });
            // console.log(results2);
        })
    })
});

app.get('/filterCatgr', (req,res) => {
    const { namakategori } = req.query;
    var sql = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                from daftarmenu d join kategori k
                on d.idkategori = k.id
                where k.nama Like '%${namakategori}%';`;
    conn.query(sql, (err, results) => {
        if(err) throw err;

        res.send(results);
        console.log(results);
    })
});

app.get('/sorthargaAsc', (req,res) => {
    const { namakategori } = req.query;
    if(namakategori !== ""){
        var sql = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                    from daftarmenu d join kategori k
                    on d.idkategori = k.id
                    WHERE k.nama LIKE '%${namakategori}%'
                    order by harga;`;
        conn.query(sql, (err, results) => {
            if(err) throw err;

            res.send(results);
            // console.log(results);
        })
    }
    else{
        sql = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                from daftarmenu d join kategori k
                on d.idkategori = k.id
                order by harga;`;
        conn.query(sql, (err, results) => {
            if(err) throw err;

            res.send(results);
            // console.log(results1);
        })
    }
});

app.get('/sorthargaDesc', (req,res) => {
    const { namakategori } = req.query;
    if(namakategori !== ""){
        var sql = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                    from daftarmenu d join kategori k
                    on d.idkategori = k.id
                    WHERE k.nama LIKE '%${namakategori}%'
                    order by harga DESC;`;
        conn.query(sql, (err, results) => {
            if(err) throw err;

            res.send(results);
            // console.log(results);
        })
    }
    else{
        sql = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                    from daftarmenu d
                    join kategori k
                    on d.idkategori = k.id
                    order by harga DESC;`;
        conn.query(sql, (err, results) => {
            if(err) throw err;

            res.send(results);
            // console.log(results);
        })
    }
});

app.get('/sortmenuAsc', (req,res) => {
    const { namakategori } = req.query;
    if(namakategori !== ""){
        var sql = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                    from daftarmenu d join kategori k
                    on d.idkategori = k.id
                    WHERE k.nama LIKE '%${namakategori}%'
                    order by menu;`;

        conn.query(sql, (err, results) => {
            if(err) throw err;

            res.send(results);
            // console.log(results);
        })
    }
    else{
        sql = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                from daftarmenu d
                join kategori k
                on d.idkategori = k.id
                order by menu;`;
        conn.query(sql, (err, results) => {
            if(err) throw err;

            res.send(results);
            // console.log(results);
        })
    }
});

app.get('/sortmenuDesc', (req,res) => {
    const { namakategori } = req.query;
    if(namakategori !== ""){
        var sql = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                    from daftarmenu d join kategori k
                    on d.idkategori = k.id
                    WHERE k.nama LIKE '%${namakategori}%'
                    order by menu DESC;`;
        conn.query(sql, (err, results) => {
            if(err) throw err;

            res.send(results);
            // console.log(results);
        })
    }
    else{
        sql = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                from daftarmenu d
                join kategori k
                on d.idkategori = k.id
                order by menu DESC;`;
        conn.query(sql, (err, results) => {
            if(err) throw err;

            res.send(results);
            // console.log(results);
        })
    }
});

app.get('/searchmenu', (req,res) => {
    const { searchValue } = req.query;
    var sql1 = `select iddaftarmenu, menu, description, harga, k.nama as kategori, images
                from daftarmenu d join kategori k
                on d.idkategori = k.id
                where menu Like '%${searchValue}%';`;
    var sql2 = `select * from kategori;`;
    conn.query(sql1, (err1, results1) => {
        if(err1) throw err
        console.log(results1.data);

        conn.query(sql2, (err2, results2) => {
            res.send({ daftarmenu: results1, kategori: results2 });
            console.log(results2.data);;
        })
    })
});

app.listen(port, () => console.log(`WMM app listening on port ${port}!`));