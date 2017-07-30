angular.module('myApp').factory('apiUrl', function($location){
	return "http://"+$location.host()+":3000"
})

