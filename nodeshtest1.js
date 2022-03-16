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

  var key = link.replace(/^(?:https?:\/\/)?(?:www\.)?/ig, "").split('?')[0]; // Remove the https and www.

  var key1 = key.replace(/[^\w\d?]/ig,"."); // This is used to remove '/' from the link....but there is a .pdf making it ..pd


// CREATING A VARIABLE OPTIONS WHICH CONTAINS THE FILE FORMAT AND LOCATION TO SAVE THE PDF FILE.
    var options = {
      paperSize: {format: "A4", orientation: 'portrait', margin: '1cm'},
      saveDir: public, // path for temporary files
      idLength: 30, // file ID length; adjust to avoid conflicts or just get smaller filenames
      loadTimeout: 800, // in ms; time for rendering the page
      autoCleanFileAgeInSec: 24 * 3600 // [s]; older files are removed; set to "-1" to disable remove
    };


exec(`url2pdf ${link} ${newFilePath}`.then(function (pdfFilePath), (error, stdout, stderr) => {
        // OUTPUTS THE WEBPAGE LINK
        console.log(key1);

        // CREATING A VARIABLE FOR THE NEW FILE PATH OF THE PDF FILE.
        var newFilePath = public+`/${key1}pdf`;


        // OUTPUTS BOTH THE OLD FILE PATH AND THE NEW FILE PATH.
        console.log(`newFilePath is: `, newFilePath, " pdfFilePath is: ",  pdfFilePath);



        // RENAMES THE PDF FILE FROM THE OLD PATH TO THE NEW PATH.
        fs.rename( pdfFilePath, newFilePath, function (data,err) {
          res.contentType("application/pdf");

          // RES.DOWNLOAD DOWNLOADS THE FILE DIRECTORY TO THE HARDDRIVE.
          //res.download(newFilePath)

          // RES.SENDFILE is used to show the file.
          res.sendFile(newFilePath);
        })


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
