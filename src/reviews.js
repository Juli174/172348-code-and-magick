'use strict';

var Filter = require('./values/filters');
var reviewElement = require('./methods/reviewElement');
var pageElement = require('./values/elements');
var template = require('./methods/template');
var listener = require('./methods/eventListener');


var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

var DEFAULT_FILTER = Filter.ALL;

var LOAD_TIMEOUT = 10000;

var PAGE_SIZE = 3;

var pageNumber = 0;

var reviews = [];

var filteredReviews = [];

if(pageElement.reviewsFilter) {
  pageElement.reviewsFilter.classList.add('invisible');
}

if(pageElement.reviewsSection) {
  pageElement.reviewsSection.classList.add('reviews-list-loading');
}

// var templateClone = template.getTemplateClone(pageElement.templateElement, 'review');

// function getReviewElement(data, container) {
//   var element = templateClone.cloneNode(true);
//   element.querySelector('.review-text').textContent = data.description;
//   element.querySelector('.review-rating').textContent = data.rating;

//   var userPic = new Image();
//   var userPicLoadTimeout;

//   userPic.onload = function(evt) {
//     clearTimeout(userPicLoadTimeout);
//     element.querySelector('.review-author').src = evt.target.src;
//   };

//   userPic.onerror = function() {
//     element.classList.add('review-load-failure');
//   };

//   userPic.src = data.author.picture;

//   userPicLoadTimeout = setTimeout(function() {
//     userPic.src = '';
//     element.classList.add('review-load-failure');
//   }, LOAD_TIMEOUT);

//   container.appendChild(element);
//   return element;
// }

function renderReviews(page, replace) {
  if(replace) {
    pageElement.reviewsContainer.innerHTML = '';
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  if (to >= filteredReviews.length) {
    pageElement.moreReviewsBtn.classList.add('invisible');
  }

  filteredReviews.slice(from, to).forEach(function(item) {
    reviewElement.getReviewElement(item, pageElement.reviewsContainer);
  });
}

function filterResultEmpty() {
  var clone = template.getTemplateClone(pageElement.reviewsNotFoundTemplate, 'not-found');

  var element = clone.cloneNode(true);
  pageElement.reviewsNotFoundContainer.appendChild(element);
}

function checkFilter() {
  if (filteredReviews.length === 0) {
    filterResultEmpty();
  } else {
    pageElement.reviewsNotFoundContainer.innerHTML = '';
  }
}

function getFilteredReviews(filter) {
  filteredReviews = reviews.slice(0);

  switch(filter) {
    case Filter.RECENT:
      filteredReviews = filteredReviews.filter(function(item) {
        var days = (new Date() - new Date(item.date)) / 1000 / 60 / 60 / 24;
        if((days >= 0) && (days < 5)) {
          return true;
        }
        return false;
      });
      filteredReviews.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      break;
    case Filter.GOOD:
      filteredReviews = filteredReviews.filter(function(review) {
        return review.rating >= 3;
      });
      break;
    case Filter.BAD:
      filteredReviews = filteredReviews.filter(function(review) {
        return review.rating < 3;
      });
      break;
    case Filter.POPULAR:
      filteredReviews.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
    default:
      filteredReviews = reviews;
      break;
  }
  checkFilter();
}

function isNextPageAvailable(page, pageSize) {
  return page < Math.floor(filteredReviews.length / pageSize);
}

pageElement.moreReviewsBtn.classList.remove('invisible');
pageElement.moreReviewsBtn.addEventListener('click', function() {
  if (isNextPageAvailable(pageNumber, PAGE_SIZE)) {
    pageNumber++;
    renderReviews(pageNumber);
  } else {
    pageElement.moreReviewsBtn.classList.add('invisible');
  }
});
//pageElement.moreReviewsBtn.addEventListener('click', listener.showMoreReviews(pageNumber));

function setFilterEnabled(filter) {
  getFilteredReviews(filter);
  pageNumber = 0;
  pageElement.moreReviewsBtn.classList.remove('invisible');
  renderReviews(pageNumber, true);
}

function setFiltersEnabled(enabled) {
  if (!enabled) {
    return;
  }
  pageElement.reviewsFilter.addEventListener('change', function(evt) {
    if (evt.target.classList.contains('review-filter')) {
      setFilterEnabled(evt.target.id);
    }
  });
}

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
  }, LOAD_TIMEOUT);

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
}

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltersEnabled(true);
  setFilterEnabled(DEFAULT_FILTER);
});

if(pageElement.reviewsFilter) {
  pageElement.reviewsFilter.classList.remove('invisible');
}
