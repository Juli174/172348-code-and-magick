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

function setImgClickEvents() {
  for (let i = 0; i < pageElement.photogalleryImgs.length; i++) {
    pageElement.photogalleryImgs[i].addEventListener('click', function(evt) {
      setGalleryVisible();
      pictureNumber = i;
      displayGallery(i, gallery);
      new Gallery(pictureNumber, gallery);
    });
  }
}

loadGallery(function(loadedGallery) {
  gallery = loadedGallery;
  var element = pageElement.overlayGallery.querySelector('.overlay-gallery-preview');
  element.insertAdjacentHTML('afterbegin', '<img src="" class="overlay-gallery-image">');
  setImgClickEvents();
  console.log(loadedGallery);
});