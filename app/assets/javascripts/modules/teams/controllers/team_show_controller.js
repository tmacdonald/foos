angular.module('foos.teams.controllers')
  .controller('TeamShowController', ['$scope', '$routeParams', 'TeamService', 'Authentication', function($scope, $routeParams, Team, Auth) {
    $scope.Math = window.Math;
    $scope.my_team = Auth.team();
    $scope.team_id = $routeParams.id;

    Team.get({ id: $scope.team_id }).$promise.then(function(team) {
      $scope.team = team;
    });
  }]);