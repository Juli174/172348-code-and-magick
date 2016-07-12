'use strict';

var pageElement = require('../values/elements');
var classModify = require('../methods/class');

var displayGallery = require('./displayGallery');

var KeyCode = {
  ESC: 27
};

var Gallery = function(pictureNumber, gallery) {
  this.closeBtn = pageElement.galleryClose;
  this.rightBtn = pageElement.galleryControlRight;
  this.leftBtn = pageElement.galleryControlLeft;

  this.pictureNumber = pictureNumber;
  this.gallery = gallery;

  this.current = document.querySelector('.preview-number-current');
  this.total = document.querySelector('.preview-number-total');

  this.total.innerHTML = this.gallery.length;

  this.setCurrent();

  this.hide = this.hide.bind(this);
  this.EscEvent = this.EscEvent.bind(this);
  this.scrollLeft = this.scrollLeft.bind(this);
  this.scrollRight = this.scrollRight.bind(this);

  this.closeBtn.addEventListener('click', this.hide);
  document.addEventListener('keydown', this.EscEvent);
  this.leftBtn.addEventListener('click', this.scrollLeft);
  this.rightBtn.addEventListener('click', this.scrollRight);
};

Gallery.prototype.hide = function() {
  if (!pageElement.overlayGallery.classList.contains('invisible')) {
    classModify.addClass(pageElement.overlayGallery, 'invisible');
  }
  location.hash = '';
  this.remove();
};

Gallery.prototype.EscEvent = function(evt) {
  if(evt.keyCode === KeyCode.ESC) {
    this.hide();
  }
};

Gallery.prototype.getPath = function() {
  var element = pageElement.photogalleryImgs[this.pictureNumber];
  var path = element.querySelector('img').src;
  return path;
};

Gallery.prototype.remove = function() {
  this.closeBtn.removeEventListener('click', this.onCloseClick);
  this.leftBtn.removeEventListener('click', this.scrollLeft);
  this.rightBtn.removeEventListener('click', this.scrollRight);
  document.removeEventListener('keydown', this.EscEvent);
};

Gallery.prototype.setCurrent = function() {
  this.current.innerHTML = this.pictureNumber + 1;
};

Gallery.prototype.scrollLeft = function() {
  if(this.pictureNumber !== 0 && !this.pictureNumber) {
    return;
  }
  if(this.pictureNumber === 0) {
    this.pictureNumber = this.gallery.length - 1;
  } else {
    this.pictureNumber--;
  }
  var path = this.getPath();
  displayGallery(this.pictureNumber, this.gallery, path);
  this.setCurrent();
};

Gallery.prototype.scrollRight = function() {
  if (this.pictureNumber !== 0 && !this.pictureNumber) {
    return;
  }
  if (this.pictureNumber === this.gallery.length - 1) {
    this.pictureNumber = 0;
  } else {
    this.pictureNumber++;
  }
  var path = this.getPath();
  displayGallery(this.pictureNumber, this.gallery, path);
  this.setCurrent();
};

function createGalleryObj(pictureNumber, gallery) {
  return new Gallery(pictureNumber, gallery);
}

module.exports = createGalleryObj;
