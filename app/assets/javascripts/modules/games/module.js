angular.module('foos.games', ['foos.games.controllers', 'foos.games.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/games/:id', { templateUrl: '/templates/games/show.html' })
      .when('/games/new/preview', { templateUrl: '/templates/games/form_new.html', controller: "NewGamePreviewController" })
      .when('/games/new', { templateUrl: '/templates/games/form.html', controller: "NewGameController" })
      .when('/games/simulate', { templateUrl: '/templates/games/simulate.html', controller: "GameSimulationController" })
      .when('/games/:team1_id/v/:team2_id', { templateUrl: '/templates/games/vs.html' })
      .when('/games', { templateUrl: '/templates/games/index.html' });
  }]);

