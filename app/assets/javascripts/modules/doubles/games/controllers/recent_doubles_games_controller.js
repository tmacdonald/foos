angular.module('foos.doubles.games.controllers')
  .controller('RecentDoublesGamesController', ['$scope', 'DoublesGameService', 'Authentication', function($scope, Game, Auth) {
    $scope.my_team = Auth.team();
    $scope.limit = 5;

    $scope.refresh = function() {
      Game.query({ order: '-played_at', limit: $scope.limit }).$promise.then(function(games) {
        $scope.recent_games = games;
      });
    };

    $scope.refresh();

  }]);