angular.module('myApp').factory("devicesAPI", function($http, apiUrl, token){

		var getData = function(type, callback){
			console.log("Recuperando Devices")
			return $http.get(apiUrl + "/"+type+"?"+
					"access_token=" + token())
			.then(function(resp){
							if (callback) callback(resp.data, resp.status)
						})
		}
		
		var update = function(pin, value){		
			return $http.get(apiUrl + "/value"+"?"+
						"access_token=" + token()+
						"&pin="+ pin +
						"&value=" + value)
				.then(function(resp){
								if (callback) callback(resp.data, resp.status)
							})
		}
		return {
			getData	:	getData,
			update	:	update
		}
})
