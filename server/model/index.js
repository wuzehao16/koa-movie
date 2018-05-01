var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'aisic.top',
  user     : 'root',
  password : '279920030',
  database : 'qq'
});

connection.connect();
var col = {name: 'test',content:'123',time:'2017-04-03',floor:"123",avator:'weeee'};
connection.query('INSERT INTO info SET ?', col, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();
