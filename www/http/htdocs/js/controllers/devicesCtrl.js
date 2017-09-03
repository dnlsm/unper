angular.module('myApp').controller("devicesCtrl",

	function($scope, devicesAPI){

		console.log("Devices controller........")

		function loadDevices() {
				console.log("get devices........")

				devicesAPI.getDevices(
					function(data){
						if (data) $scope.devices = data
					}
				)
		}

		loadDevices()

	}
);
