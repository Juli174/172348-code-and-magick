var constant = require('../values/constants');
var pageElement = require('../values/elements');

function getReviews(callback) {
  var xhr = new XMLHttpRequest();
  var reviewsLoadTimeout;

  xhr.onload = function(evt) {
    clearTimeout(reviewsLoadTimeout);
    var loadedData = JSON.parse(evt.target.response);
    pageElement.reviewsSection.classList.remove('reviews-list-loading');
    callback(loadedData);
  };

  xhr.onerror = function() {
    pageElement.reviewsSection.classList.remove('reviews-list-loading');
    pageElement.reviewsSection.classList.add('reviews-load-failure');
  };

  reviewsLoadTimeout = setTimeout(function() {
    var loadedData = [];
    callback(loadedData);
    pageElement.reviewsSection.classList.remove('reviews-list-loading');
    pageElement.reviewsSection.classList.add('reviews-load-failure');
  }, constant.LOAD_TIMEOUT);

  // xhr.open('GET', constant.REVIEWS_LOAD_URL);
  xhr.open('GET', 'reviews.json');
  xhr.send();
}

module.exports = getReviews;