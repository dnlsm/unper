angular.module('myApp').controller("devicesCtrl", function($scope, $http, devicesAPI){
		var loadDevices = function() {
				devicesAPI.getDevices().success(function(data){
				$scope.devices = data
			})
		}
		$scope.changeValue = function(device){

		}
		loadDevices()
	}
);
