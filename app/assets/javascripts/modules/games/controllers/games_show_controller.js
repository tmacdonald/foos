angular.module('foos.games.controllers')  
  .controller('GamesShowController', ['$scope','$routeParams','GameService', 'Authentication', function($scope, $routeParams, Game, Auth) {
    $scope.my_team = Auth.team();

    Game.get({id: $routeParams.id}, function(game, headers) {
      $scope.game = game;
    });
  }]);