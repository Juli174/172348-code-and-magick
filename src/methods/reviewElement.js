var constant = require('../values/constants');
var pageElement = require('../values/elements');
var template = require('./template');

var templateClone = template.getTemplateClone(pageElement.templateElement, 'review');

module.exports = {
  getReviewElement: function(data, container){
    var element = templateClone.cloneNode(true);
    element.querySelector('.review-text').textContent = data.description;
    element.querySelector('.review-rating').textContent = data.rating;

    var userPic = new Image();
    var userPicLoadTimeout;

    userPic.onload = function(evt) {
      clearTimeout(userPicLoadTimeout);
      element.querySelector('.review-author').src = evt.target.src;
    };

    userPic.onerror = function() {
      element.classList.add('review-load-failure');
    };

    userPic.src = data.author.picture;

    userPicLoadTimeout = setTimeout(function() {
      userPic.src = '';
      element.classList.add('review-load-failure');
    }, constant.LOAD_TIMEOUT);

    container.appendChild(element);
    return element;
  }
}