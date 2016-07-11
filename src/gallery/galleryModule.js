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

  this.current = document.querySelector('.preview-number-current');
  this.total = document.querySelector('.preview-number-total');

  this.total.innerHTML = gallery.length;

  this.setCurrent = function(){
    self.current.innerHTML = pictureNumber + 1;
  };

  this.setCurrent();

  this.hide = function() {
    if (!pageElement.overlayGallery.classList.contains('invisible')) {
      classModify.addClass(pageElement.overlayGallery, 'invisible');
    }
    self.remove();
  };

  this.onCloseClick = function(){
    self.hide();
  };

  this.scrollLeft = function(){
    if(pictureNumber != 0 && !pictureNumber) return;
    if(pictureNumber == 0){
      pictureNumber = gallery.length - 1;
    } else {
      pictureNumber--;
    }
    displayGallery(pictureNumber, gallery);
    self.setCurrent();
  };

  this.scrollRight = function(){
    if (pictureNumber != 0 && !pictureNumber) return;
    if (pictureNumber == gallery.length - 1) {
      pictureNumber = 0;
    } else {
      pictureNumber++;
    }
    displayGallery(pictureNumber, gallery);
    self.setCurrent();
  };

  this.EscEvent = function(evt){
    if(evt.keyCode == KeyCode.ESC){
      self.onCloseClick();
    }
  }

  this.closeBtn.addEventListener('click', self.onCloseClick);

  document.addEventListener('keydown', self.EscEvent);

  this.leftBtn.addEventListener('click', self.scrollLeft);
  this.rightBtn.addEventListener('click', self.scrollRight);

  this.remove = function(){
    self.closeBtn.removeEventListener('click', self.onCloseClick);
    self.leftBtn.removeEventListener('click', self.scrollLeft);
    self.rightBtn.removeEventListener('click', self.scrollRight);
    document.removeEventListener('keydown', self.EscEvent);
  }
};

module.exports = Gallery;