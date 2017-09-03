angular.module('myApp').factory("devicesAPI", function($http, apiUrl, token){

		var getDevices = function(callback){
			console.log("Recuperando Devices")
			return $http.get(apiUrl + "/devices?"+
					"access_token=" + token())
			.then(function(resp){
							if (callback) callback(resp.data, resp.status)
						})
		}
		
		return {
			getDevices: getDevices
		}
})
