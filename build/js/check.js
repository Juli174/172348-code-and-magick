function getMessage(a ,b){
	if(typeof a == 'boolean'){
		if(a){
			return "Я попал в " + b;
		} else{
			return "Я никуда не попал";
		}
	} else if(typeof a == 'number'){
		return "Я прыгнул на" + a * 100 + "сантиметров";
	} else(Object.prototype.toString.call(a) === '[object Array]')
}