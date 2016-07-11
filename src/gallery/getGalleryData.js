'use strict';

var constant = require('../values/constants');

function loadGallery(callback) {
  var xhr = new XMLHttpRequest();
  var galleryLoadTimeout;

  xhr.onload = function(evt) {
    clearTimeout(galleryLoadTimeout);
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.onerror = function() {
    console.log('error!');
  };

  galleryLoadTimeout = setTimeout(function() {
    var loadedData = [];
    callback(loadedData);
  }, constant.LOAD_TIMEOUT);

  xhr.open('GET', 'gallery.json');
  xhr.send();
}

module.exports = loadGallery;
