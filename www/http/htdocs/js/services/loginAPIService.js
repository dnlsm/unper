angular.module('myApp').factory("loginAPI", function($http, $location){
		var login = function( credentials){
			return $http.post("http://"+$location.host()+":3000/login",
					JSON.stringify(credentials))
		}
		
		return {
			login: login
		}
})
