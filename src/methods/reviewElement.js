var constant = require('../values/constants');
var pageElement = require('../values/elements');
var getTemplateClone = require('./template');

var templateClone = getTemplateClone(pageElement.templateElement, 'review');

function getReviewElement(data, container){
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

module.exports = getReviewElement;