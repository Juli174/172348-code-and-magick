var pageElement = require('../values/elements');
var template = require('./template');

function filterResultEmpty(filteredReviews)   {
  var clone = template.getTemplateClone(pageElement.reviewsNotFoundTemplate, 'not-found');

  var element = clone.cloneNode(true);
  pageElement.reviewsNotFoundContainer.appendChild(element);
}

var checkFilter = function (filteredReviews) {
  if (filteredReviews.length === 0) {
    filterResultEmpty();
  } else {
    pageElement.reviewsNotFoundContainer.innerHTML = '';
  }
}

module.exports = checkFilter;