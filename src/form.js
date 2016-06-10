'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var formFieldName = document.querySelector('#review-name');
  var formReviewText = document.querySelector('#review-text');
  var linkFieldName = document.querySelector('.review-fields-name');
  var reviewFieldName = document.querySelector('.review-fields-text');

  var reviewFields = document.querySelector('.review-fields');
  var submitBtn = document.querySelector('.review-submit');

  if(reviewFieldName){
    reviewFieldName.style.display = 'none';
  }

  function getMark(){
    var marks = document.getElementsByName('review-mark');
    if(!marks) return;
    var mark;
    for(var i = 0; i < marks.length; i++){
      if(marks[i].checked){
        mark = marks[i].value;
      }
    }
    return mark;
  }

  function displayReviewLink(){
    var currentMark = getMark();
    if(currentMark < 3){
      if(reviewFieldName){
        reviewFieldsFn();
        reviewFieldName.style.display = 'inline';
      } 
    } else{
      reviewFieldsFn();
      reviewFieldName.style.display = 'none';
    }
  }

  displayReviewLink();

  window.setMark = function(chosen){
    displayReviewLink();
  }

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  function reviewFieldsFn(){
    var mark = getMark();
    if(!formFieldName.value.length || (!formReviewText.value && mark < 3)){
      submitBtn.setAttribute('disabled', true);
      reviewFields.style.display = 'inline-block';
    } else{
      submitBtn.removeAttribute('disabled');
      reviewFields.style.display = 'none';
    }
  }

  formFieldName.onkeyup = function(evt){
    if(formFieldName.value.length > 0){
        linkFieldName.style.display = 'none';
    } else{
      linkFieldName.style.display = 'inline';
    }
    reviewFieldsFn();
  };

  formReviewText.onkeyup = function(){
    if(formReviewText.value.length > 0){
      reviewFieldName.style.display = 'none';
    } else{
      reviewFieldName.style.display = 'inline';
    }
    reviewFieldsFn();
  };

})();
