var constant = require('../values/constants');
var pageElement = require('../values/elements');
var reviewElement = require('./reviewElement');

module.exports = {
  renderReviews: function (page, replace, filteredReviews) {
    if(replace) {
      pageElement.reviewsContainer.innerHTML = '';
    }

    var from = page * constant.PAGE_SIZE;
    var to = from + constant.PAGE_SIZE;

    if (to >= filteredReviews.length) {
      pageElement.moreReviewsBtn.classList.add('invisible');
    }

    filteredReviews.slice(from, to).forEach(function(item) {
      reviewElement.getReviewElement(item, pageElement.reviewsContainer);
    });
  }
}