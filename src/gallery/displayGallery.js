'use strict';

var constant = require('../values/constants');
var pageElement = require('../values/elements');

function displayPicture(ind, gallery, path) {
  var picture = new Image();
  var pictureTimeout;

  picture.onload = function(evt) {
    clearTimeout(pictureTimeout);
    var element = pageElement.overlayGallery.querySelector('.overlay-gallery-image');
    element.src = evt.target.src;
  };

  picture.onerror = function() {
    console.log('error');
  };

  pictureTimeout = setTimeout(function() {
    picture.src = '';
  }, constant.LOAD_TIMEOUT);

  picture.src = path;
}

module.exports = displayPicture;
