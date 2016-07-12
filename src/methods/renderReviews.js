var constant = require('../values/constants');
var pageElement = require('../values/elements');
var getReviewElement = require('./reviewElement');

var renderedReviews = [];

var Review = function(data, container) {
  var self = this;
  this.data = data;
  this.element = getReviewElement(data, container);

  this.isPressedSelected = function(element) {
    if(element.classList.contains('review-quiz-answer-active')) {
      return true;
    }
    return false;
  };

  this.getElementNumber = function(element){
    var ind;
    for (var i = 0; i < self.quizs.length; i++) {
      if (self.quizs[i] == element) {
        ind = i;
      }
    }
    return ind;
  };

  this.quizs = this.element.querySelectorAll('.review-quiz > span');

  this.onClick = function(evt) {
    var ind = self.getElementNumber(evt.target);
    var currentEnabled = self.isPressedSelected(self.quizs[ind]);
    for(var i = 0; i < self.quizs.length; i++) {
      if (self.isPressedSelected(self.quizs[i])) {
        self.quizs[i].classList.remove('review-quiz-answer-active');
      }
    }
    if(!currentEnabled) {
      self.quizs[ind].classList.add('review-quiz-answer-active');
    }
  };

  var quiz = this.element.querySelector('.review-quiz');
  quiz.addEventListener('click', this.onClick);

  this.remove = function() {
    quiz.removeEventListener('click', this.onClick);
    self.element.parentNode.removeChild(self.element);
  };
};

function renderReviews(page, replace, filteredReviews) {
  if(replace && renderedReviews.length) {
    renderedReviews.forEach(function(review){
      review.remove();
    });
    renderedReviews = [];
  }

  var from = page * constant.PAGE_SIZE;
  var to = from + constant.PAGE_SIZE;

  if (to >= filteredReviews.length) {
    pageElement.moreReviewsBtn.classList.add('invisible');
  }

  filteredReviews.slice(from, to).forEach(function(item) {
    var element = new Review(item, pageElement.reviewsContainer);
    renderedReviews.push(element);
  });


}

module.exports = renderReviews;