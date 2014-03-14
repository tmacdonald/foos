angular.module('foos.doubles.games', ['foos.doubles.games.controllers', 'foos.doubles.games.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/doubles/games', { templateUrl: '/templates/doubles/games/index.html' });
  }]);
//= require modules/doubles/games/controllers
//= require modules/doubles/games/services