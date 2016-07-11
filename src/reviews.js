'use strict';

var Filter = require('./values/filters');
var pageElement = require('./values/elements');

var showMoreReviews = require('./methods/eventListener');
var renderReviews = require('./methods/renderReviews');
var getFilteredReviews = require('./methods/getFilteredReviews');
var getReviews = require('./methods/getReviews');
var classModify = require('./methods/class');

var DEFAULT_FILTER = Filter.ALL;

var pageNumber = 0;

var reviews = [];

var filteredReviews = [];

classModify.addClass(pageElement.reviewsFilter, 'invisible');
classModify.addClass(pageElement.reviewsSection, 'reviews-list-loading');

classModify.removeClass(pageElement.moreReviewsBtn, 'invisible');

pageElement.moreReviewsBtn.addEventListener('click', function(){
  pageNumber = showMoreReviews(pageNumber, filteredReviews);
});

function setFilterEnabled(filter) {
  filteredReviews = getFilteredReviews(filter, reviews, filteredReviews);
  pageNumber = 0;
  pageElement.moreReviewsBtn.classList.remove('invisible');
  renderReviews(pageNumber, true, filteredReviews);
}

function setFiltersEnabled(enabled) {
  if (!enabled) {
    return;
  }
  pageElement.reviewsFilter.addEventListener('change', function(evt) {
    if (evt.target.classList.contains('review-filter')) {
      localStorage.setItem('filter', evt.target.id);
      setFilterEnabled(evt.target.id);
    }
  });
}

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltersEnabled(true);
  var filter = localStorage.getItem('filter');
  if(!filter) {
    filter = DEFAULT_FILTER;
  }
  document.getElementById(filter).checked = true;
  setFilterEnabled(filter);
});

classModify.removeClass(pageElement.reviewsFilter, 'invisible');