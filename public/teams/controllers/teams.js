'use strict';

angular.module('mean.teams').controller('TeamsController', ['$scope', '$stateParams', '$location', 'Global', 'Teams', function ($scope, $stateParams, $location, Global, Teams) {
    $scope.global = Global;

    $scope.create = function() {
        var team = new Teams({
            name: this.name,
            //content: this.content
        });
        team.$save(function(response) {
            $location.path('teams/' + response._id);
        });

        this.title = '';
        //this.content = '';
    };

    $scope.remove = function(team) {
        if (team) {
            team.$remove();

            for (var i in $scope.teams) {
                if ($scope.teams[i] === team) {
                    $scope.teams.splice(i, 1);
                }
            }
        }
        else {
            $scope.team.$remove();
            $location.path('teams');
        }
    };

    $scope.update = function() {
        var team = $scope.team;
        if (!team.updated) {
            team.updated = [];
        }
        team.updated.push(new Date().getTime());

        team.$update(function() {
            $location.path('teams/' + team._id);
        });
    };

    $scope.find = function() {
        Teams.query(function(teams) {
            $scope.teams = teams;
        });
    };

    $scope.findOne = function() {
        Teams.get({
            teamId: $stateParams.teamId
        }, function(team) {
            $scope.team = team;
        });
    };
}]);