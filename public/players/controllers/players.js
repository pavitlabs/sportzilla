'use strict';

angular.module('mean.players').controller('PlayersController', ['$scope', '$stateParams', '$location', 'Global', 'Players', function ($scope, $stateParams, $location, Global, Players) {
    $scope.global = Global;

    $scope.create = function() {
        var player = new Players({
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            gender: this.gender,
            teamId: this.teamId,
            city: this.city,
            state: this.state,
            country: this.country
        });
        player.$save(function(response) {
            $location.path('players/' + response._id);
        });

        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.birthDate = '';
        this.gender = '';
        this.teamId = '';
        this.city = '';
        this.state = '';
        this.country = '';
    };

    $scope.remove = function(player) {
        if (player) {
            player.$remove();

            for (var i in $scope.players) {
                if ($scope.players[i] === player) {
                    $scope.players.splice(i, 1);
                }
            }
        }
        else {
            $scope.player.$remove();
            $location.path('players');
        }
    };

    $scope.update = function() {
        var player = $scope.player;
        if (!player.updated) {
            player.updated = [];
        }
        player.updated.push(new Date().getTime());

        player.$update(function() {
            $location.path('players/' + player._id);
        });
    };

    $scope.find = function() {
        Players.query(function(players) {
            $scope.players = players;
        });
    };

    $scope.findOne = function() {
        Players.get({
            playerId: $stateParams.playerId
        }, function(player) {
            $scope.player = player;
        });
    };
}]);