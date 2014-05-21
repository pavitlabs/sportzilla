'use strict';

//Players service used for players REST endpoint
angular.module('mean.players').factory('Players', ['$resource', function($resource) {
    return $resource('players/:playerId', {
        teamId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);