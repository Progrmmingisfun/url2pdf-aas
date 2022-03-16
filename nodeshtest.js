const { exec } = require("child_process");
const express = require('express')
const app = express()
const PORT = 8080;
var path = require('path');
const fs = require("fs");
var bodyParser = require('body-parser');
var url = require("url");
var url2pdf = require("url2pdf");
var crypto = require('crypto');


//HERE WE SETUP THE EXPRESSS APP
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var public = path.join(__dirname, 'pdf');


app.get('/convert/topdf', urlencodedParser, function(req, res) {

  var link = req.query.link;

  var newFilePath = public+`/${link}pdf`;

  exec(`wkhtmltopdf ${link} output.pdf`, (error, stdout, stderr) => {

    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});
