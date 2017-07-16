angular
.module('myApp',['ngRoute'])
.config(['$routeProvider',
	function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl:'/pages/home.html'
		})
		.when('/login',{
			templateUrl: '/pages/login.html',
			controller: 'loginCTRL'
		})
		.when('/about',{
			templateUrl: '/pages/about.html'
		})
	}

])
.controller(
	"loginCTRL",
	function($scope){
		$scope.name = "Dandasdilo";
	}

);