angular.module('myApp').controller("loginCtrl", function($scope, loginAPI){
		$scope.login = function(credentials){
			loginAPI.login(credentials, function(err, token){
				if (err) console.log("Erro ao autenticar")
				else console.log(token)
				loginAPI.refreshStatus()
			})
		}

		$scope.logout = function(){
			window.localStorage.removeItem('token')
			loginAPI.refreshStatus()
		}
	}

);
