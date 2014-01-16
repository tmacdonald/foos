angular.module('foos.games.controllers')
  .controller('GameSimulationController', ['$scope', 'GameService', function($scope, Game) {
    $scope.simulation = {
      score1: 10,
      score2: 0,
      points1: 500,
      points2: 500
    };

    $scope.simulate = function() {
      Game.simulate($scope.simulation).$promise.then(function(data) {
        $scope.points = data.points;
      });
    };
  }]);