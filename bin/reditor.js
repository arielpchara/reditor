#!/usr/bin/env node
'use strict';
var path = require('path');
var fs = require('fs');
var os = require('os');
var lzs = require('lz-string');
var _ = require('lodash');
var program = require('commander');

program
  .version('0.0.1')
  .usage('<file ...>')
  .parse(process.argv);

var filepath = path.join( process.cwd() , program.args[0]);

fs.lstat(filepath,function (err, stat) {
  if(err) console.log(err);
  var compressed = lzs.compressToBase64(filepath);
  // require('reditor')
  require('../index.js').then(function (address) {
    var ip = _.chain(os.networkInterfaces()).where({'internal':false,'family':'IPv4'}).address;
    console.log('http://'+(process.env.RDT_HOST||'localhost')+':'+address.port+'/'+compressed);
  });
});
