function sumMulti(a, b){
	if(a.length == b.length){
		return 0;
	}
	var sum = 0;
	for(var i = 0; i < a.length; i++){
		sum += a[i] * b[i];
	}
	return sum;
}

function getMessage(a ,b){
	if(typeof a == 'boolean'){
		if(a){
			return "Я попал в " + b;
		} else{
			return "Я никуда не попал";
		}
	} else if(typeof a == 'number'){
		return "Я прыгнул на " + a * 100 + " сантиметров";
	} else if(Object.prototype.toString.call(a) === '[object Array]'){
		return a.reduce(function(sum, current){
			return sum + current;
		}, 0);
	} else if((Object.prototype.toString.call(a) === '[object Array]') && (Object.prototype.toString.call(b) === '[object Array]')){
		var length = sumMulti(a, b);
		return "Я прошел " + length + "метров";
	}
}