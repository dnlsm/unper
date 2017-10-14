angular.module('myApp').factory("loginAPI", function($rootScope, $http, apiUrl, token){


	// Valida o token para poder requisitar recursos da api
		var validateToken = function(callback){
			if (token()){
				console.log("Validating token")
				$http.get(apiUrl + "/auth/validate?"+
									"access_token=" + token()).then(function(response){
										if (callback)
											return callback(true)
									},
									function(response){

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
					credentials)
			.success(
						function(data){
							if (data){
								if (typeof(Storage) !== undefined) {
	    								localStorage.setItem("token", data.token)
								} else {
									$rootScope.token = data.token
								}

								if (callback)
									return callback(false, data.token)
							}
							if (callback)
								return callback(true)
						}
					)
		}


		var signup = function(credentials, callback){
			$http.post(apiUrl + "/auth/signup",
					credentials)
			.then(
					function(response){
						console.log("SIM SIM")
						if (callback)
							return callback(false)
					},

					function (response){
						console.log("NAO NAO")
						if (callback)
							return callback(true)
					}
				)
		}
		
		return {
			login: login,
			signup:signup,
			validateToken: validateToken,
			refreshStatus: refreshStatus
		}
})



// Acessa
angular.module('myApp').factory('token', function($rootScope){
		return () => {	if (typeof(Storage) !== "undefined") 
	    					return localStorage.getItem("token")
					else
						return $rootScope.token
				}
})
