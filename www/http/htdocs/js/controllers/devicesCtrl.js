angular.module('myApp').controller("devicesCtrl", function($scope, $http, devicesAPI){

		console.log("Devices controller........")

		var loadDevices = function() {
				console.log("get devices........")
				devicesAPI.getDevices(function(data){
				if (data) $scope.devices = data
			})
		}
		loadDevices()
	}
);
