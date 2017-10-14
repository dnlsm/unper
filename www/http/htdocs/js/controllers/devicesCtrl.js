angular.module('myApp').controller("devicesCtrl",

	function($scope, devicesAPI){

		console.log("Devices controller........")


		$scope.loadDevices = function () {
				console.log("getting devices........")

				devicesAPI.getData('peripheral',
					function(data){
						if (data) $scope.peripherals = data
					}
				)
				devicesAPI.getData('triggers',
					function(data){
						if (data) $scope.triggers = data
					}
				)
				devicesAPI.getData('options',
					function(data){
						if (data) $scope.options = data
					}
				)
		}
		$scope.switchVal = function(per){
			console.log("Switch VAL")
			devicesAPI.update(per.port, (per.value === true)?(1):(0))
		}
		$scope.setActive = function (item){
			$scope.activeItem=item;
		}
	}
);
