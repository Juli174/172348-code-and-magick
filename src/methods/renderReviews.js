var constant = require('../values/constants');
var pageElement = require('../values/elements');
var getReviewElement = require('./reviewElement');

var renderedReviews = [];

var Review = function(data, container) {
  var self = this;
  self.data = data;
  self.element = getReviewElement(data, container);

  self.isPressedSelected = function(element) {
    if(element.classList.contains('review-quiz-answer-active')){
      return true;
    }
    return false;
  };

  self.getElementNumber = function(element){
    var ind;
    for (var i = 0; i < self.quizs.length; i++) {
      if (self.quizs[i] == element) {
        ind = i;
      }
    }
    return ind;
  };

  self.onClick = function(evt) {
    var ind = self.getElementNumber(evt.target);
    var currentEnabled = self.isPressedSelected(self.quizs[ind]);
    for (var i = 0; i < self.quizs.length; i++) {
      if (self.isPressedSelected(self.quizs[i])) {
        self.quizs[i].classList.remove('review-quiz-answer-active');
      }
    }
    if (!currentEnabled) {
      self.quizs[ind].classList.add('review-quiz-answer-active');
    }
  };

  self.quizs = self.element.getElementsByClassName('review-quiz-answer');
  for (let i = 0; i < self.quizs.length; i++){
    self.quizs[i].addEventListener('click', self.onClick);
  }

  self.remove = function(){
    for(let i = 0; i < self.quizs.length; i++){
      self.quizs[i].removeEventListener('click', self.onClick);
    }
    self.element.parentNode.removeChild(self.element);
  };
};

function renderReviews(page, replace, filteredReviews) {
  if(replace && renderedReviews.length) {
    //pageElement.reviewsContainer.innerHTML = '';
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