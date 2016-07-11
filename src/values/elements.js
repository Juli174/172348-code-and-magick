'use strict';

module.exports = {
  reviewsFilter: document.querySelector('.reviews-filter'),
  reviewsSection: document.querySelector('.reviews'),
  reviewsContainer: document.querySelector('.reviews-list'),
  templateElement: document.querySelector('#review-template'),
  reviewsNotFoundTemplate: document.querySelector('#reviews-not-found'),
  reviewsNotFoundContainer: document.querySelector('.reviews-not-found'),
  moreReviewsBtn: document.querySelector('.reviews-controls-more'),

  overlayGallery: document.querySelector('.overlay-gallery'),
  photogalleryImgs: document.querySelectorAll('.photogallery-image'),
  galleryControlLeft: document.querySelector('.overlay-gallery-control-left'),
  galleryControlRight: document.querySelector('.overlay-gallery-control-right'),
  galleryClose: document.querySelector('.overlay-gallery-close')
};
