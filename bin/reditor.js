#!/usr/bin/env node

'use strict';
var path = require('path');
var fs = require('fs');
var os = require('os');
var lzs = require('lz-string');
var _ = require('lodash');

var argv = require('argv').option([
  {
    name: 'option',
    short: 'o',
    type: 'string',
    description: 'Defines an option for your script',
    example: "'script --opiton=value' or 'script -o value'"
  }
]).run();

var filepath = path.join( process.cwd() , argv.targets[0]);

fs.lstat(filepath,function (err, stat) {
  if(err) throw err;
  var compressed = lzs.compressToBase64(filepath);
  console.log(compressed);
  require('reditor.js').then(function (address) {
    var ip = _.chain(os.networkInterfaces()).where({'internal':false,'family':'IPv4'}).address;
    console.log('http://'+(process.env.RDT_HOST|'localhost')+':'+address.port+'/'+compressed);
  });
});
