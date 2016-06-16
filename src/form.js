'use strict';

(function() {
  var browserCookies = require('browser-cookies');

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var formFieldName = document.querySelector('#review-name');
  var formReviewText = document.querySelector('#review-text');
  var linkFieldName = document.querySelector('.review-fields-name');
  var reviewFieldName = document.querySelector('.review-fields-text');

  var reviewFields = document.querySelector('.review-fields');
  var submitBtn = document.querySelector('.review-submit');

  if (reviewFieldName) {
    reviewFieldName.style.display = 'none';
  }

  var name = browserCookies.get('userName');
  if (name) {
    formFieldName.value = name;
  }

  var mark = browserCookies.get('mark');
  if (mark) {
    setDafaultMark(mark);
  }

  function getExpireDate() {
    var todayDate = new Date();
    var year = todayDate.getFullYear();
    var current = new Date(year, 7, 9);
    if (year.valueOf() - current.valueOf() < 0) {
      return current;
    } else{
      return new Date(year + 1, 7, 9);
    }
  }

  var expireDate = getExpireDate();

  function setDafaultMark(number) {
    var marks = document.getElementsByName('review-mark');
    for (var i = 0; i < marks.length; i++){
      if (marks[i].checked){
        marks[i].checked = false;
      }
    }
    marks[number - 1].checked = true;
  }

  function getMark() {
    var marks = document.getElementsByName('review-mark');
    if (!marks) {return undefined;}
    var number;
    for (var i = 0; i < marks.length; i++){
      if (marks[i].checked){
        number = marks[i].value;
      }
    }
    return number;
  }

  function displayReviewLink() {
    var currentMark = getMark();
    if (currentMark < 3) {
      if (reviewFieldName) {
        reviewFieldsFn();
        reviewFieldName.style.display = 'inline';
      }
    } else{
      reviewFieldsFn();
      reviewFieldName.style.display = 'none';
    }
    return currentMark;
  }

  displayReviewLink();

  window.setMark = function() {
    var number = displayReviewLink();
    browserCookies.set('mark', number, {expires: expireDate});
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  function reviewFieldsFn() {
    var number = getMark();
    if (!formFieldName.value.length || (!formReviewText.value && number < 3)){
      submitBtn.setAttribute('disabled', true);
      reviewFields.style.display = 'inline-block';
    } else{
      submitBtn.removeAttribute('disabled');
      reviewFields.style.display = 'none';
    }
  }

  formFieldName.onkeyup = function() {
    if (formFieldName.value.length > 0){
      linkFieldName.style.display = 'none';
    } else {
      linkFieldName.style.display = 'inline';
    }
    browserCookies.set('userName', formFieldName.value, {expires: expireDate});
    reviewFieldsFn();
  };

  formReviewText.onkeyup = function() {
    if(formReviewText.value.length > 0) {
      reviewFieldName.style.display = 'none';
    } else{
      reviewFieldName.style.display = 'inline';
    }
    reviewFieldsFn();
  };

})();
