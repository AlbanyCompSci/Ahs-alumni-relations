var Request = require('request');
var fs = require('fs');

var testUrl = 'https://docs.google.com/spreadsheet/ccc?key=0At2sqNEgxTf3dEt5SXBTemZZM1gzQy1vLVFNRnludHc&output=csv'
var jsonFile = '../example_jsons/foobar.json'

function convertCSVtoJSON(str) {
    var jsonVal = [];

    var data = String(str)
        .replace(/\r/g, '')
        .split('\n')
        .map(function(val) { return val.split(','); });

    var headers = data.shift();

    for (var row of data) {
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = row[j];
        }
        jsonVal.push(obj);
    }

    return jsonVal;
}

function updateJSON(url) {
    Request.get(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonVal = JSON.stringify(convertCSVtoJSON(body));
            fs.writeFile(jsonFile, jsonVal, function(err) {
                if (err) {
                    return console.log('Error! ' + err);
                }
            })
        }
    });
}

updateJSON(testUrl);

