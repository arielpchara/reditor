var express = require('express');
var nunjucks = require('nunjucks');
var path = require('path');
var fs = require('fs');
var lzs = require('lz-string');
var Q = require('q');
var bodyParser = require('body-parser');
var app = express();
var server;

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/read/:filepath',function (req, res) {
    var filepath = lzs.decompressFromBase64(req.params.filepath);
    var filename = path.basename(filepath);
    var mimetype  = require('mime-types').lookup(filename);
    var content  = fs.readFileSync(filepath);
    res.json({
        content:content.toString(),
        mimetype: mimetype
    });
});

app.use(express.static(__dirname + '/public'));

app.use('/lzs',function(req, res) {
    res.render('lzs.html');
});

app.get('/exit',function (req, res) {
  res.json('ok');
  process.exit();
});

app.get('/:filepath',function(req, res) {
    res.render('index.html',{filepath:req.params.filepath});
});

app.post('/:filepath',function(req, res) {
    var filepath = lzs.decompressFromBase64(req.params.filepath);
    var content = req.body.content;
    fs.writeFile(filepath, content, function (err, data) {
        res.json(data);
    });
});

app.use(function(req, res) {
    res.render('index.html');
});

var deferred = Q.defer();

server = app.listen(process.env.RDT_PORT||8087, function () {
    deferred.resolve(server.address());
    // console.log('lets go', server.address().address, server.address().port);
});


var io = require('socket.io')(server);

io.on('connection', function (socket) {

  socket.on('file', function (data) {
    var filepath = lzs.decompressFromBase64(data.filepath);
    var filename = path.basename(filepath);
    var mimetype  = require('mime-types').lookup(filename);
    var content  = fs.readFileSync(filepath);
    socket.emit('file', {
        content:content.toString(),
        mimetype: mimetype
    });
  });

  socket.on('write', function (data) {
    var filepath = lzs.decompressFromBase64(data.filepath);
    var content = data.file;
    fs.writeFile(filepath, data.content, function (err, data) {
        console.log('File saved! '+ filepath);
    });
  });

  socket.on('exit', process.exit);

});

module.exports = deferred.promise;
