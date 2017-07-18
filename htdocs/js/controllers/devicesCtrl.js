angular.module('myApp').controller("devicesCtrl", function($scope, $http){
		$scope.devices = [
			{name: 'Led', 	type: 'GPIO', pin: 26},
			{name: 'Led2',	type: 'GPIO', pin: 19}
		];
		$scope.changeValue = function(device){
			value = (device.value)?0:1;
			device.s = value
			console.log(device.value)
			$http.get("/gpio/?pin="+device.pin+"&value="+value)
		}
	}
);
