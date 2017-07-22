angular.module('myApp').factory("loginAPI", function($http, $location){
		var login = function( credentials){
			return $http.get("http://"+$location.host()+":3000/login?"+
									"user="+ credentials.user +
									"&pwd="+ credentials.pwd, 
							{withCredentials:true})
		}
		
		return {
			login: login
		}
})
