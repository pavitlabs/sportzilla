'use strict';

//Setting up route
angular.module('mean.players').config(['$stateProvider', '$urlRouterProvider',
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
            .state('players on my teams', {
                url: '/players',
                templateUrl: 'public/players/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create player', {
                url: '/players/create',
                templateUrl: 'public/players/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit player', {
                url: '/players/:playerId/edit',
                templateUrl: 'public/players/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('player by id', {
                url: '/players/:playerId',
                templateUrl: 'public/players/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);