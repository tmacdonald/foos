angular.module('foos.teams.controllers')

  .controller('VsRecentGamesController', ['$scope', 'GameService', 'Authentication', function($scope, Game, Auth) {
    $scope.my_team = Auth.team();
    $scope.limit = 5;

    $scope.$watch('team_id', function(team_id) {
      Game.query({ team1_id: $scope.my_team.id, team2_id: team_id, order: '-played_at', limit: 5 }).$promise.then(function(games) {
        $scope.recent_games = games;
      });
    });

    $scope.isWinner = function(game) {
      return $scope.my_team.id == game.team1.id;
    };

    $scope.isCurrentTeam = function(team_id) {
      return team_id == $scope.my_team.id;
    };
  }]);