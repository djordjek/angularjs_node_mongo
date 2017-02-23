(function() {
    'use strict';

    angular
        .module('harness', ['ngRoute'])
        .config(appConfig)
        .run(run);

    appConfig.$inject = ['$routeProvider'];

    function appConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'static/html/home.html'
            })
            .when('/activities', {
                templateUrl: 'static/html/activities.html'
            })
            .when('/activities/add', {
                templateUrl: 'static/html/addEditActivity.html',
                controller: 'ActivityController'
            })
            .when('/activities/edit/:id', {
                templateUrl: 'static/html/addEditActivity.html',
                controller: 'ActivityController'
            })
            .when('/logs', {
                templateUrl: 'static/html/logs.html',
                controller: 'LogController'
            })
            .when('/logs/add', {
                templateUrl: 'static/html/addEditLog.html',
                controller: 'LogController'
            })
            .when('/login', {
                templateUrl: 'static/html/login.html',
                controller: 'MainController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();