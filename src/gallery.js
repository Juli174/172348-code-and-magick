'use strict';

var classModify = require('./methods/class');
var pageElement = require('./values/elements');

var displayGallery = require('./gallery/displayGallery');
var loadGallery = require('./gallery/getGalleryData');
var galleryObj = require('./gallery/galleryModule');

var gallery = [];

var pictureNumber;

var path = '';

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

function setHash(evt) {
  var hash = evt.target.src.slice(location.origin.length);
  var re = /img\/(\S+)/;
  if(hash.match(re) && hash.match(re).length !== 0) {
    location.hash = hash;
    return hash;
  }
  location.hash = '';
  return '';
}

window.addEventListener('hashchange', function() {
  if(location.hash === '') {
    classModify.addClass(pageElement.overlayGallery, 'invisible');
    return;
  }
  setGalleryVisible();
  displayGallery(pictureNumber, gallery, path);
});

function setImgClickEvents() {
  var photogallery = document.querySelector('.photogallery');
  photogallery.addEventListener('click', function(evt) {
    pictureNumber = getSelectedNumber(evt.target);
    galleryObj(pictureNumber, gallery);
    path = setHash(evt);
  });
}

function checkHash() {
  var hash = location.hash;
  var re = /img\/(\S+)/;
  if(hash && hash.match(re) && hash.match(re).length !== 0){
    path = hash.slice(2);
  } else {
    return 0;
  }
  var image;

  for (var i = 0; i < pageElement.photogalleryImgs.length; i++) {
    //var imgPath = pageElement.photogalleryImgs[i].querySelector('img').src.slice(location.origin.length);
    image = pageElement.photogalleryImgs[i].querySelector('img').src.slice(location.origin.length + 1);
    if(path === image) {
      pictureNumber = i;
      setGalleryVisible();
      displayGallery(pictureNumber, gallery, path);
      galleryObj(pictureNumber, gallery);
    }
  }
  
}

loadGallery(function(loadedGallery) {
  gallery = loadedGallery;
  var element = pageElement.overlayGallery.querySelector('.overlay-gallery-preview');
  element.insertAdjacentHTML('afterbegin', '<img src="" class="overlay-gallery-image">');
  setImgClickEvents();
  checkHash();
});
