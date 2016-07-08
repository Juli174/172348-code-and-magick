var constant = require('../values/constants');
var pageElement = require('../values/elements');
var getReviewElement = require('./reviewElement');

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
    for (var i = 0; i < self.quizs[i].length; i++) {
      if (self.quizs[i] == element) {
        ind = i;
      }
    }
    return ind;
  };

  self.onClick = function(evt) {
    // for (var i = 0; i < self.quizs.length; i++) {
    //   if(self.quizs[i].classList.contains('review-quiz-answer-active') && self.quizs[i] == evt.target){
    //     evt.target.classList.remove('review-quiz-answer-active');
    //   } else {
    //     self.quizs[i].classList.remove('review-quiz-answer-active');
    //     evt.target.classList.add('review-quiz-answer-active');
    //   }
    // }
    var ind = self.getElementNumber(evt.target);
    for (var i = 0; i < self.quizs.length; i++) {
      if (self.isPressedSelected(self.quizs[i])) {
        self.quizs[i].classList.remove('review-quiz-answer-active');
      }
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
  };
};

function renderReviews(page, replace, filteredReviews) {
  if(replace) {
    pageElement.reviewsContainer.innerHTML = '';
  }

  var from = page * constant.PAGE_SIZE;
  var to = from + constant.PAGE_SIZE;

  if (to >= filteredReviews.length) {
    pageElement.moreReviewsBtn.classList.add('invisible');
  }

  filteredReviews.slice(from, to).forEach(function(item) {
    var element = new Review(item, pageElement.reviewsContainer);
  });


}

module.exports = renderReviews;