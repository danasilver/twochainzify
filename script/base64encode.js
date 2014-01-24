#!/usr/bin/env node

/**
 * Creates file of base64 encoded sounds.
 *
 * Copyright 2014 Dana Silver
 */

var fs = require('fs')
  , path = require('path');

var mp3Path = path.resolve(__dirname, '../assets/mp3')
  , mp3FileNames = fs.readdirSync(mp3Path)
  , oggPath = path.resolve(__dirname, '../assets/ogg')
  , oggFileNames = fs.readdirSync(oggPath)
  , mp3base64 = []
  , oggbase64 = [];


for (var i = 0, l = mp3FileNames.length; i < l; i++) {
  var mp3FilePath = path.resolve(mp3Path, mp3FileNames[i]);

  var mp3FileBuffer = new Buffer(fs.readFileSync(mp3FilePath), 'binary');

  mp3base64.push(mp3FileBuffer.toString('base64'));
}

for (var i = 0, l = oggFileNames.length; i < l; i++) {
  var oggFilePath = path.resolve(oggPath, oggFileNames[i]);

  var oggFileBuffer = new Buffer(fs.readFileSync(oggFilePath), 'binary');

  oggbase64.push(oggFileBuffer.toString('base64'));
}

var soundsToWrite = {
  mp3: {
    prefix: 'data:audio/mp3;base64,',
    sounds: mp3base64
  },
  ogg: {
    prefix: 'data:audio/ogg;base64,',
    sounds: oggbase64
  }
};

var writeString = 'var mp3 = ' + JSON.stringify(soundsToWrite.mp3) + 
                  '; var ogg = ' + JSON.stringify(soundsToWrite.ogg) + ';';

fs.writeFileSync(path.resolve(__dirname, '../src/sounds.js'), writeString);