angular.module('foos.games.controllers')
  .controller('RecentGamesController', ['$scope', '$interval', 'GameService', 'Authentication', function($scope, $interval, Game, Auth) {
    $scope.my_team = Auth.team();
    $scope.limit = 5;

    $scope.refresh = function() {
      Game.query({ order: '-played_at', limit: $scope.limit }).$promise.then(function(games) {
        $scope.recent_games = games;
      });
    };

    $scope.refresh();
    $interval($scope.refresh, 5000);

  }]);