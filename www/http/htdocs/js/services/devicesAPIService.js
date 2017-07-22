angular.module('myApp').factory("devicesAPI", function($http, $location){
		var getDevices = function(){
			return $http.get("http://"+$location.host()+":3000/devices",
						{withCredentials:true})
		}
		
		return {
			getDevices: getDevices
		}
})
