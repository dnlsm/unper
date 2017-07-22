angular.module('myApp').controller("loginCtrl", function($scope, loginAPI){
		$scope.login = function(credentials){
			loginAPI.login(credentials).success(function(data){
				console.log("logou: "+ data)
			})
		}
	}

);
