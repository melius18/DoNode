var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'test',
    debug: false
});

var id = "ra";
var name = "jangwoo";
var age = 40;
var password = "1234";

pool.getConnection(function (err, conn) {
    if (err) {
        console.error("error");
        if (conn) {
            conn.release();
        }
    }

    console.log("Database Thread ID: " + conn.threadId);

    var data = {
        id: id,
        name: name,
        age: age,
        password: password
    }

    var columns = ['id', 'name', 'age'];
    var tablename = 'users';

    /*
    var exec = conn.query('insert into users set ?', data, function (err, result) {
        conn.release();
        console.log('exec target: ' + exec.sql);

        if (err) {
            console.log("error");
            return;
        }
        console.log("complete");
        console.dir(result);
    });
    */

    var exec = conn.query('select ?? from ?? where id = ? and password = ?',
        [columns, tablename, id, password], function (err, rows) {
            conn.release();
            console.log('exec.sql: ' + exec.sql);

            if (rows.length > 0) {
                console.log('id: [%s], name: [%s]', rows[0].id, rows[0].name);
                console.dir(rows);
            }
        });
});