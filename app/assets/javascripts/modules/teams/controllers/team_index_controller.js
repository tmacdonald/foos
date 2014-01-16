angular.module('foos.teams.controllers')
  .controller('TeamIndexController', ['$scope', 'TeamService', 'TeamUtils', 'Authentication', function($scope, Team, TeamUtils, Auth) {
    $scope.Auth = Auth;
    $scope.Utils = TeamUtils;

    Team.query({ order: '-points' }).$promise.then(function(teams) {
      $scope.teams = teams;
    });
  }]);