var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

var Filter = {
	'ALL': 'reviews-all',
	'RECENT': 'reviews-recent',
	'GOOD': 'reviews-good',
	'BAD': 'reviews-bad',
	'POPULAR': 'reviews-popular'
};

var DEFAULT_FILTER = Filter.ALL;

var reviewsFilter = document.querySelector('.reviews-filter');
if(reviewsFilter){
	reviewsFilter.classList.add('invisible');
}

var reviewsSection = document.querySelector('.reviews');
if(reviewsSection){
	reviewsSection.classList.add('reviews-list-loading');
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

function renderReviews(reviews){
	reviewsContainer.innerHTML = '';

	for(var i = 0; i < reviews.length; i++){
		getReviewElement(reviews[i], reviewsContainer);
	}
};

function getFilteredReviews(reviews, filter){
	var reviewsToFilter = reviews.slice(0);

	switch(filter){
		case Filter.RECENT:
			reviewsToFilter = reviewsToFilter.filter(function(item, i){
				var days = (new Date() - new Date(item.date)) / 1000 / 60 / 60 / 24;
				if((days >= 0) && (days < 5)){
					return true;
				}
			});
			reviewsToFilter.sort(function(a, b){
				return new Date(b.date) - new Date(a.date);
			});
			break;
		case Filter.GOOD:
			reviewsToFilter = reviewsToFilter.filter(function(review){
				return review.rating >= 3;
			});
			break;
		case Filter.BAD:
			reviewsToFilter = reviewsToFilter.filter(function(review){
				return review.rating < 3;
			});
			break;
		case Filter.POPULAR:
			reviewsToFilter.sort(function(a, b){
				return b.review_usefulness - a.review_usefulness;
			});
			break;
		default:
			reviewsToFilter = reviews;
			break;
	}
	return reviewsToFilter;
}

function setFilterEnabled(filter){
	var filteredReviews = getFilteredReviews(reviews, filter);
	renderReviews(filteredReviews);
}

function setFiltersEnabled(enabled){
	var filters = reviewsFilter.querySelectorAll('input');
	for(var i = 0; i < filters.length; i++){
		filters[i].onchange = enabled ? function(evt){
			setFilterEnabled(this.id);
		} : null;
	}
}

function getReviews(callback){
	var xhr = new XMLHttpRequest();

	xhr.onload = function(evt){
		var loadedData = JSON.parse(evt.target.response);
		reviewsSection.classList.remove('reviews-list-loading');
		callback(loadedData);
	};

	xhr.onerror = function(){
		reviewsSection.classList.remove('reviews-list-loading');
		reviewsSection.classList.add('reviews-load-failure');
	}

	xhr.open('GET', REVIEWS_LOAD_URL);
	xhr.send();
};

getReviews(function(loadedReviews){
	reviews = loadedReviews;
	setFiltersEnabled(true);
	setFilterEnabled(DEFAULT_FILTER);
});

if(reviewsFilter){
	reviewsFilter.classList.remove('invisible');
}