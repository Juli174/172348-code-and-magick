var reviewsFilter = document.querySelector('.reviews-filter');
if(reviewsFilter){
	reviewsFilter.classList.add('invisible');
}

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('#review-template');
var templateClone;


if('content' in templateElement){
	var templateClone = templateElement.content.querySelector('.review');
} else{
	var templateClone = templateElement.querySelector('.review');
}

function getReviewElement(data, container){
	var element = templateClone.cloneNode(true);
	element.querySelector('.review-text').textContent = data.description;
	element.querySelector('.review-rating').textContent = data.rating;

	var userPic = new Image();

	userPic.onload = function(evt){
		element.querySelector('.review-author').src = evt.target.src; 
	}

	userPic.onerror = function(){
		element.classList.add('review-load-failure');
	}

	userPic.src = data.author.picture;

	container.appendChild(element);
	return element;
}

reviews.forEach(function(review){
	getReviewElement(review, reviewsContainer);
});

if(reviewsFilter){
	reviewsFilter.classList.remove('invisible');
}