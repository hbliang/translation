var translate = require('google-translate-api');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var from = req.query.from || 'auto',
      to = req.query.to,
      source = req.query.source;
  var send = {};

  translate(source, {from, to}).then(res => {
    send.text = res.text;
  }).catch(error => {
    send.error = error;
  }).then(() => {
    res.json(send);
  });
  
})

app.listen(3000, 'localhost');

// translate('你好朋友', {to: 'en'}).then(res => {
//     console.log(res.text);
//     //=> I speak English
//     console.log(res.from.language.iso);
//     //=> nl
// }).catch(err => {
//     console.error(err);
// });
