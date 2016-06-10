'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var formFieldName = document.querySelector('#review-name');
  var linkFieldName = document.querySelector('.review-fields-name');
  var reviewFieldName = document.querySelector('.review-fields-text');

  if(reviewFieldName){
    reviewFieldName.style.display = 'none';
  }

  function getMark(){
    var marks = document.getElementsByName('review-mark');
    if(!marks) return;
    var mark;
    marks.forEach(function(item, i){
      if(item.checked){
        mark = item.value;
      }
    });
    return mark;
  }

  function displayReviewLink(){
    var currentMark = getMark();
    if(currentMark < 3){
      if(reviewFieldName){
        reviewFieldName.style.display = 'block';
      }
    }
  }

  displayReviewLink();

  function setMark(selectedMark){
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

  formFieldName.onkeyup = function(evt){
    if(formFieldName.value.length > 0){
        linkFieldName.style.display = 'none';
    }
  };

})();
