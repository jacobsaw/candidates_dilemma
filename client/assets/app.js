var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/index.html',
            controller: 'indexController'
        })
        .when('/admin', {
            templateUrl: 'partials/moderator.html',
            controller: 'modController'
        })
        .when('/debate', {
            templateUrl: 'partials/debate.html',
            controller: 'debateController'
        })
        .when('/result', {
            templateUrl: 'partials/result.html',
            controller: 'resultController'
        })
        .otherwise('/');
});
