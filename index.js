var config = require('./config.json');
var Spreadsheet = require('edit-google-spreadsheet');
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
      // Found rows: { '3': { '5': 'hello!' } }
    });

    //use speadsheet!
  });