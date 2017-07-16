angular.module('myApp',['ngRoute'])

angular.module('myApp').config(['$routeProvider',
	function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl:'/pages/home.html'
		})
		.when('/login',{
			templateUrl: '/pages/login.html',
			controller: 'loginCtrl'
		})
		.when('/peripherals',{
			templateUrl: '/pages/devices.html',
			controller: 'devicesCtrl' 
		})
		.when('/about',{
			templateUrl: '/pages/about.html',
			controller: 'aboutCtrl'
		})
	}

])

angular.module('myApp').controller("loginCtrl", function($scope){
		$scope.login = function(credentials){
			console.log(credentials)
		}
	}

)

angular.module('myApp').controller("aboutCtrl", function ($scope){
		$scope.about = {
			Author: 	'Danilo',
			Version: 	'v1.0',
			GitHub: 	'http://github.com/dnlsm/unper'
		}
	}
);

angular.module('myApp').controller("devicesCtrl", function($scope, $http){
		$scope.devices = [
			{name: 'Led', 	type: 'GPIO', pin: 26},
			{name: 'Led2',	type: 'GPIO', pin: 19}
		];
		$scope.changeValue = function(device){
			value = (device.value)?0:1;
			device.s = value
			console.log(device.value)
			$http.get("/gpio/?pin="+device.pin+"&value="+value)
		}
	}
);