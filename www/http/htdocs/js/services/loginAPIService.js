angular.module('myApp').factory("loginAPI", function($rootScope, $http, apiUrl, token){


	// Valida o token para poder requisitar recursos da api
		var validateToken = function(callback){
			if (token()){
				console.log("Validating token")
				$http.get(apiUrl + "/auth/validate?"+
									"access_token=" + token()).then(function(response){
										console.log("sim")
										if (callback)
											return callback(true)
									},
									function(response){
										console.log("nao")
										if (callback)
											return callback(false)
									})
			}
			return callback(false)
		}

	// Atualiza isLogged
		var refreshStatus = function()	{
				console.log("Refreshing status")
				validateToken(function(status){
						console.log("1Refreshing status %s",status)
						$rootScope.isLogged = status;
				})
		}

	// Loga na Api com as credentials do uuario
		var login = function(credentials, callback){
			$http.post(apiUrl + "/auth/login",
					credentials).success(function(data){
						if (data){
							window.localStorage.setItem('token', data.token)
							if (callback)
								return callback(false, data.token)
						}
						if (callback)
							return callback(true)
			})
		}
		
		return {
			login: login,
			validateToken: validateToken,
			refreshStatus: refreshStatus
		}
})



// Acessa
angular.module('myApp').factory('token', function(){
		return () => {return window.localStorage.getItem('token')}
})