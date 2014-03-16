angular.module('foos.doubles.teams.controllers')
  .controller('DoublesPlayersIndexController', ['$scope', 'TeamService', 'TeamUtils', 'Authentication', function($scope, Team, TeamUtils, Auth) {
    $scope.Auth = Auth;
    $scope.Utils = TeamUtils;

    Team.doubles({ order: '-wins' }).$promise.then(function(teams) {
      $scope.players = teams;
    });
  }]);