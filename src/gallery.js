'use strict';

var classModify = require('./methods/class');
var pageElement = require('./values/elements');

var displayGallery = require('./gallery/displayGallery');
var loadGallery = require('./gallery/getGalleryData');
var Gallery = require('./gallery/galleryModule');

var gallery = [];

var pictureNumber;

function setGalleryVisible() {
  if (pageElement.overlayGallery.classList.contains('invisible')) {
    classModify.removeClass(pageElement.overlayGallery, 'invisible');
  }
}

function getSelectedNumber(selected) {
  for (var i = 0; i < pageElement.photogalleryImgs.length; i++) {
    if(pageElement.photogalleryImgs[i] === selected.parentNode) {
      return i;
    }
  }
  return 0;
}

function setImgClickEvents() {
  var photogallery = document.querySelector('.photogallery');
  photogallery.addEventListener('click', function(evt) {
    setGalleryVisible();
    pictureNumber = getSelectedNumber(evt.target);
    displayGallery(pictureNumber, gallery);
    Gallery(pictureNumber, gallery);
  });
}

loadGallery(function(loadedGallery) {
  gallery = loadedGallery;
  var element = pageElement.overlayGallery.querySelector('.overlay-gallery-preview');
  element.insertAdjacentHTML('afterbegin', '<img src="" class="overlay-gallery-image">');
  setImgClickEvents();
});
