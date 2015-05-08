var app = angular.module('hello', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'home.html',
                    controller: 'home'
                })
                .when('/test', {
                    templateUrl: 'test.html',
                    controller: 'test'
                })
                .when('/todos', {
                    templateUrl: 'todos.html',
                    controller: 'todos'
                })
                .when('/register', {
                    templateUrl: 'register.html',
                    controller: 'register'
                })
                .when('/login', {
                    templateUrl: 'login.html',
                    controller: 'login'
                })
                .otherwise('/');
        })
        .controller('navigation', function ($rootScope, $scope, $http, $location, $route) {
            $scope.tab = function (route) {
                return $route.current && route === $route.current.controller;
            };
            /*$http.get('http://localhost:8080/user').success(function (data) {
                if (data.id) {
                    $scope.authenticated = true;
                    $rootScope.userId = data.id;
                } else {
                    $rootScope.authenticated = false;
                }
            }).error(function () {
                $rootScope.authenticated = false;
            });*/
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
        })
        .controller('home', function ($scope, $http) {
            /*$http.get('http://localhost:8080/resource/').success(function (data) {
                $scope.greeting = data;
            })*/
        })
        .controller('login', function ($rootScope, $scope, $http, $location) {
            $scope.login = function () {
                $http.post("http://localhost:8080/test", $scope.credentials)
                    .success(function (data) {
                        if (data.id) {
                            $rootScope.authenticated = true;
                            $rootScope.user = data;
                            $location.path('/')
                        } else {
                            $rootScope.authenticated = false;
                        }
                    });
            }
        })
        .controller('test', function ($scope, $http) {
            $scope.test = 'foo'
        })
        .controller('register', function ($scope, $http, $window) {
            $scope.register = function () {
                $http.post("http://localhost:8080/registration", $scope.registration)
                    .success(function (data) {
                        $window.location.href = 'http://localhost:8080/login';
                    });
            }
        })
        .controller('todos', function ($rootScope, $scope, $http) {
            $scope.createToDo = function () {
                $http.post("http://localhost:8080/todos", $scope.todo)
                    .success(function (data) {
                        var todo = {name: $scope.todo.name};
                        $scope.todos.push(todo);
                    });
            };
            var userUrl = 'http://localhost:8080/todos';
            $http.get(userUrl, {
                params: {
                    user: $rootScope.userId
                }
            })
                .success(function (data) {
                    $scope.todos = data._embedded.todos;
                });
        })
    ;

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);