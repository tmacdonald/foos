angular.module('foos.doubles.teams.controllers')
  
  .controller('DoublesStandingsController', ['$scope', 'TeamService', 'DoublesTeamService', 'Authentication', function($scope, Team, DoublesTeam, Auth) {
    $scope.limit = 5;

    DoublesTeam.query({ order: '-wins', limit: $scope.limit }).$promise.then(function(teams) {
      $scope.teams = teams;
    });

    Team.doubles({ order: '-wins', limit: $scope.limit }).$promise.then(function(teams) {
      $scope.players = teams;
    });
  }]);

