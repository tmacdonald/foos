angular.module('foos.games', ['foos.games.controllers', 'foos.games.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/games/new', { templateUrl: '/templates/games/form.html', controller: "NewGameController" })
      .when('/games', { templateUrl: '/templates/games/index.html' });
  }]);

//= require modules/games/controllers
//= require modules/games/services