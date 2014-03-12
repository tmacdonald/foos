angular.module('foos.teams.controllers')

  .controller('TeamRecentGamesController', ['$scope', 'TeamGameService', 'Authentication', function($scope, Game, Auth) {
    $scope.my_team = Auth.team();
    $scope.limit = 10;

    $scope.$watch('team_id', function(team_id) {
      Game.query({ team_id: team_id, order: '-played_at', limit: $scope.limit }).$promise.then(function(games) {
        $scope.recent_games = games;
        $scope.graph_games = games.slice(0);
        $scope.graph_games.reverse();
      });
    });

    $scope.isWinner = function(game) {
      return $scope.team_id == game.team1.id;
    };

    $scope.isCurrentTeam = function(team_id) {
      return team_id == $scope.team_id;
    };
  }]);