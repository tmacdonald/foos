angular.module('foos.doubles.teams.controllers')
  
  .controller('DoublesStandingsController', ['$scope', 'DoublesTeamService', 'Authentication', function($scope, Team, Auth) {
    $scope.limit = 5;

    Team.query({ order: '-wins', limit: $scope.limit }).$promise.then(function(teams) {
      $scope.teams = teams;
    });
  }]);

