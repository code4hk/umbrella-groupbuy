var config = require('./config.json');
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('./public'));
var Spreadsheet = require('edit-google-spreadsheet');


var currentRow=2;
var outstandingBuy = [];

Spreadsheet.load({
    debug: true,
    spreadsheetId: '1hK2qNzNMxNhOSUTgAM8DBx1LxkLD5zMcd-hGlTyNkrM',
    worksheetId: 'od6',
    // Choose from 1 of the 3 authentication methods:
    //    1. Username and Password
    username: config.user,
    password: config.password,
    // OR 2. OAuth
    // oauth : {
    //   email: 'my-name@google.email.com',
    //   keyFile: 'my-private-key.pem'
    // },
    // // OR 3. Token
    // accessToken : {
    //   type: 'Bearer',
    //   token: 'my-generated-token'
    // }
  }, function sheetReady(err, spreadsheet) {
    if(err) throw err;

    spreadsheet.receive(function(err, rows, info) {
      if(err) throw err;
      console.log("Found rows:", rows);

      currentRow = Object.keys(rows).length +1;
      // Found rows: { '3': { '5': 'hello!' } }
    });


//batch
//cancel
//global state
//keep reading for manual edit
//queue


    app.post('/deal/:dealId/buy', function(req, res){
      var text = 'Buy deal '+req.params.dealId +' for '+req.body.userId+':'+req.body.userName;
      var rows = {};
      var columns={};
      columns[1]=req.params.dealId;
      columns[2]=req.param('userId');
      rows[currentRow]=columns;
      currentRow++;
      spreadsheet.add(rows);
        spreadsheet.send(function(err) {
        console.log(err);
      // if(err) throw err;
        console.log("Updated Cell at row "+currentRow);


//current row
//next row
      console.log(text);
      res.send(text);

        });

      

    });

    app.listen(3000);


    //use speadsheet!
  });


