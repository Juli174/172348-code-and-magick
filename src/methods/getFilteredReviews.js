'use strict';

var pageElement = require('../values/elements');
var getTemplateClone = require('./template');
var Filter = require('../values/filters');

function filterResultEmpty() {
  var clone = getTemplateClone(pageElement.reviewsNotFoundTemplate, 'not-found');

  var element = clone.cloneNode(true);
  pageElement.reviewsNotFoundContainer.appendChild(element);
}

var checkFilter = function(filteredReviews) {
  if (filteredReviews.length === 0) {
    filterResultEmpty();
  } else {
    pageElement.reviewsNotFoundContainer.innerHTML = '';
  }
};

function getFilteredReviews(filter, reviews, filteredReviews) {
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
  checkFilter(filteredReviews);
  return filteredReviews;
}

module.exports = getFilteredReviews;
