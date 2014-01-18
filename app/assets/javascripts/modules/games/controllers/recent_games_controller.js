angular.module('foos.games.controllers')
  .controller('RecentGamesController', ['$scope', 'GameService', 'Authentication', function($scope, Game, Auth) {
    $scope.my_team = Auth.team();
    $scope.limit = 5;

    Game.query({ order: '-played_at', limit: $scope.limit }).$promise.then(function(games) {
      $scope.recent_games = games;
    });
  }]);