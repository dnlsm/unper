angular.module('myApp').controller("loginCtrl", function($scope, $location, loginAPI){
		$scope.errSignup = false;

		$scope.login = function(credentials){
			loginAPI.login(credentials, function(err, token){
				if (err) return console.log("Erro ao autenticar")

				console.log("token = %s",token )
				loginAPI.refreshStatus()
				$location.url('/');

			})
		}

		$scope.logout = function(){
			window.localStorage.removeItem('token')
			loginAPI.refreshStatus()
		}

		$scope.signup = function(credentials){
			loginAPI.signup(credentials, function(err){
				if (err) return $scope.errSignup = true
				console.log('usuário cadastrado')
				$location.url('/login');
			})
		}
	}

);
