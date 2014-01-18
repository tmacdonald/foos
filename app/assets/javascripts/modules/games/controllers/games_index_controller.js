angular.module('foos.games.controllers')  
  .controller('GamesIndexController', ['$scope','$routeParams','$location','GameService', 'Authentication', function($scope, $routeParams, $location, Game, Auth) {
    $scope.my_team = Auth.team();

    $scope.page_size = 10;
    $scope.page = parseInt($routeParams.page) || 1;

    Game.query({order: '-played_at', offset: ($scope.page - 1) * $scope.page_size, limit: $scope.page_size}, function(games, headers) {
      $scope.games = games;
      $scope.total = headers('x-total-resources');
      $scope.pages = Math.ceil($scope.total / $scope.page_size);
    });

    $scope.getNumber = function(number) {
      return new Array(number);
    };
  }]);