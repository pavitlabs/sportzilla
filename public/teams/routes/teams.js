'use strict';

//Setting up route
angular.module('mean.teams').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        //================================================
        // Check if the user is connected
        //================================================
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };
        //================================================
        // Check if the user is not conntect
        //================================================
        var checkLoggedOut = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');

                }

                // Not Authenticated
                else {
                    $timeout(deferred.resolve, 0);

                }
            });

            return deferred.promise;
        };
        //================================================


        // states for my app
        $stateProvider
            .state('my teams', {
                url: '/teams',
                templateUrl: 'public/teams/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create team', {
                url: '/teams/create',
                templateUrl: 'public/teams/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit team', {
                url: '/teams/:teamId/edit',
                templateUrl: 'public/teams/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('team by id', {
                url: '/teams/:teamId',
                templateUrl: 'public/teams/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('add players to team', {
                url: '/teams/:teamId/players/create',
                templateUrl: 'public/players/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
    }
])