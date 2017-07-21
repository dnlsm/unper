angular.module('myApp',['ngRoute'])

angular.module('myApp').config(['$routeProvider',
	function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl:'/view/home.html'
		})
		.when('/login',{
			templateUrl: '/view/login.html',
			controller: 'loginCtrl'
		})
		.when('/devices',{
			templateUrl: '/view/devices.html',
			controller: 'devicesCtrl' 
		})
		.when('/about',{
			templateUrl: '/view/about.html',
			controller: 'aboutCtrl'
		})
	}

])






