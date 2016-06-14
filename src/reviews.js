var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

var Filter = {
	'ALL': 'all',
	'RECENT': 'recent',
	'GOOD': 'good',
	'BAD': 'bad',
	'POPULAR': 'popular'
};

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
			reviewsToFilter.sort(function(a, b){

			});
			break;
		case 'GOOD':
			reviewsToFilter.filter(function(review){
				return review.rating >= 3;
			});
			break;
		case 'BAD':
			reviewsToFilter.filter(function(review){
				return review.rating < 3;
			});
			break;
		case 'POPULAR':
			reviewsToFilter.sort(function(a, b){
				return a.review_usefulness - b.review_usefulness;
			});
			break;
		default:
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
		console.log(loadedData);
		callback(loadedData);
	};

	xhr.open('GET', REVIEWS_LOAD_URL);
	xhr.send();
};

getReviews(function(loadedReviews){
	reviews = loadedReviews;
	setFiltersEnabled(true);
});

if(reviewsFilter){
	reviewsFilter.classList.remove('invisible');
}