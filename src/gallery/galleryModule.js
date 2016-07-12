'use strict';

var pageElement = require('../values/elements');
var classModify = require('../methods/class');

var displayGallery = require('./displayGallery');

var KeyCode = {
  ESC: 27
};

var Gallery = function(pictureNumber, gallery) {
  var self = this;

  this.closeBtn = pageElement.galleryClose;
  this.rightBtn = pageElement.galleryControlRight;
  this.leftBtn = pageElement.galleryControlLeft;

  this.pictureNumber = pictureNumber;

  this.current = document.querySelector('.preview-number-current');
  this.total = document.querySelector('.preview-number-total');

  this.total.innerHTML = gallery.length;

  this.setCurrent();

  this.hide = function() {
    if (!pageElement.overlayGallery.classList.contains('invisible')) {
      classModify.addClass(pageElement.overlayGallery, 'invisible');
    }
    location.hash = '';
    this.remove();
  };

  this.onCloseClick = function() {
    self.hide();
  };

  this.scrollLeft = function() {
    if(self.pictureNumber !== 0 && !self.pictureNumber) {
      return;
    }
    if(self.pictureNumber === 0) {
      self.pictureNumber = gallery.length - 1;
    } else {
      self.pictureNumber--;
    }
    var path = self.getPath();
    displayGallery(self.pictureNumber, gallery, path);
    self.setCurrent();
  };

  this.scrollRight = function() {
    if (self.pictureNumber !== 0 && !self.pictureNumber) {
      return;
    }
    if (self.pictureNumber === gallery.length - 1) {
      self.pictureNumber = 0;
    } else {
      self.pictureNumber++;
    }
    var path = self.getPath();
    displayGallery(self.pictureNumber, gallery, path);
    self.setCurrent();
  };

  this.EscEvent = function(evt) {
    if(evt.keyCode === KeyCode.ESC) {
      self.onCloseClick();
    }
  };

  this.closeBtn.addEventListener('click', self.onCloseClick);

  document.addEventListener('keydown', self.EscEvent);

  this.leftBtn.addEventListener('click', self.scrollLeft);
  this.rightBtn.addEventListener('click', self.scrollRight);
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

function createGalleryObj(pictureNumber, gallery) {
  return new Gallery(pictureNumber, gallery);
}

module.exports = createGalleryObj;
