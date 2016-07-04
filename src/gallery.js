var constant = require('./values/constants');
var pageElement = require('./values/elements');

var classModify = require('./methods/class');

var gallery = [];

var pictNumber = 1;

var KeyCode = {
	ESC: 27
};

var leftControl = document.querySelector('.overlay-gallery-control-left');
var rightControl = document.querySelector('.overlay-gallery-control-right');

leftControl.addEventListener('', function(){
  if(pictNumber == 1){
  	pictNumber = 5;
  } else{
  	pictNumber--;
  }
  displayPicture();
});

rightControl.addEventListener('click', function(){
  if(pictNumber == 5){
  	pictNumber = 1;
  } else{
  	pictNumber++;
  }
  displayPicture();
});

document.addEventListener('keydown', function(evt) {
  if (evt.keyCode) {
    classModify.addClass(pageElement.overlayGallery, 'invisible');
  }
});

var galleryClose = document.querySelector('.overlay-gallery-close');
galleryClose.addEventListener('click', function(){
  classModify.addClass(pageElement.overlayGallery, 'invisible');
});

function loadGallery(callback) {
  var xhr = new XMLHttpRequest();
  var galleryLoadTimeout;

  xhr.onload = function(evt) {
    clearTimeout(galleryLoadTimeout);
    var loadedData = JSON.parse(evt.target.response);
    gallery = loadedData;
    pageElement.overlayGallery.querySelector('.preview-number-total').innerHTML = gallery.length;
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

loadGallery(function(loadedGallery){
  var element = pageElement.overlayGallery.querySelector('.overlay-gallery-preview');
  element.insertAdjacentHTML('afterbegin', '<img width="1280" height="720" src="" class="overlay-gallery-image">');
  pictNumber = 1;
  displayGallery();
});

function displayPicture(){
  
  var picture = new Image();
  var pictureTimeout;

  picture.onload = function(evt){
     clearTimeout(pictureTimeout);
     var element = pageElement.overlayGallery.querySelector('.overlay-gallery-image');
     element.src = evt.target.src;
     pageElement.overlayGallery.querySelector('.preview-number-current').innerHTML = pictNumber;
  };

  picture.onerror = function(){
    console.log('error!');
  };

  picture.src = gallery[pictNumber - 1].path;

  pictureTimeout = setTimeout(function(){
    picture.src = '';
  }, constant.LOAD_TIMEOUT);
}

function displayGallery(){
  classModify.removeClass(pageElement.overlayGallery, 'invisible');

  displayPicture();
}

