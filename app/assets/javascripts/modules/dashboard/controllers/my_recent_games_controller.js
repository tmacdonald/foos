angular.module('foos.dashboard.controllers')

  .controller('MyRecentGamesController', ['$scope', 'TeamGameService', 'Authentication', function($scope, TeamGame, Auth) {

    $scope.limit = 5;
    $scope.my_team = Auth.team();

    TeamGame.query({ team_id: $scope.my_team.id, order: '-played_at', limit: $scope.limit }).$promise.then(function(games) {
      $scope.team_recent_games = games;
    });  

  }]);