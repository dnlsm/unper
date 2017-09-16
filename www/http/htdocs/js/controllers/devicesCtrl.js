angular.module('myApp').controller("devicesCtrl",

	function($scope, devicesAPI){

		console.log("Devices controller........")


		$scope.loadDevices = function () {
				console.log("getting devices........")

				devicesAPI.getDevices(
					function(data){
						if (data) $scope.devices = data
					}
				)
		}

		$scope.triggerTypes = [
									{name: 'Set High', value:'SET_TRIGGER'},
									{name: 'Set Low' , value:'CLEAR_TRIGGER'},
									{name: 'Toggle', value:'TOGGLE_TRIGGER'}
								]
								
		$scope.setActive = function (item){
			$scope.activeItem=item;
		}
	}
);
