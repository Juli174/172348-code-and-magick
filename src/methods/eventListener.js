var constant = require('../values/constants');
var pageElement = require('../values/elements');
var renderReviews = require('./renderReviews');

function isNextPageAvailable(page, pageSize, filteredReviews) {
  return page < Math.floor(filteredReviews.length / pageSize);
}

module.exports = {
  showMoreReviews: function (pageNumber, filteredReviews) {
    if (isNextPageAvailable(pageNumber, constant.PAGE_SIZE, filteredReviews)) {
      pageNumber++;
      renderReviews.renderReviews(pageNumber, false, filteredReviews);
    } else {
      pageElement.moreReviewsBtn.classList.add('invisible');
    }
  }
}