var app = angular.module('hello', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'home'
        }).when('/test', {
            templateUrl: 'test.html',
            controller: 'test'
        }).otherwise('/');
    })
    .controller('navigation',
    function ($rootScope, $scope, $http, $location, $route) {
        $scope.tab = function (route) {
            return $route.current && route === $route.current.controller;
        };
        $http.get('http://localhost:8080/user').success(function (data) {
            if (data.name) {
                $rootScope.authenticated = true;
            } else {
                $rootScope.authenticated = false;
            }
        }).error(function () {
            $rootScope.authenticated = false;
        });
        $scope.credentials = {};
        $scope.logout = function () {
            $http.post('logout', {}).success(function () {
                $rootScope.authenticated = false;
                $location.path("/");
            }).error(function (data) {
                console.log("Logout failed")
                $rootScope.authenticated = false;
            });
        }
    }).controller('home', function ($scope, $http) {
        $http.get('http://localhost:8080/resource/').success(function (data) {
            $scope.greeting = data;
        })
    }).controller('test', function ($scope, $http) {
        $scope.test = 'foo'
    });

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);