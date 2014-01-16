angular.module('foos.teams.controllers')
  
  .controller('VsStatsController', ['$scope', 'StatsService', 'Authentication', function($scope, Stats, Auth) {
    $scope.my_team = Auth.team();
    $scope.limit = 5;

    $scope.$watch('team_id', function(team_id) {
      Stats.query({ team_id: $scope.my_team.id, team1_id: team_id }).$promise.then(function(stats) {
        $scope.stats = stats;
      });
    });
  }]);