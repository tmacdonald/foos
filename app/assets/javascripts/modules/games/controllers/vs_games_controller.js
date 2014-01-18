angular.module('foos.games.controllers')
  .controller('VsGamesController', ['$scope', '$routeParams', 'GameService', function($scope, $routeParams, Game) {
    var team1_id = $routeParams.team1_id,
        team2_id = $routeParams.team2_id;

    Game.query({ team1_id: team1_id, team2_id: team2_id, order: '-played_at' }).$promise.then(function(games) {
      $scope.games = games;
    });
  }]);