angular.module('foos.doubles.teams.controllers')
  .controller('DoublesTeamsIndexController', ['$scope', 'DoublesTeamService', 'TeamUtils', 'Authentication', function($scope, Team, TeamUtils, Auth) {
    $scope.Auth = Auth;
    $scope.Utils = TeamUtils;

    Team.query({ order: '-wins' }).$promise.then(function(teams) {
      $scope.teams = teams;
    });
  }]);