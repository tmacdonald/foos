angular.module('foos.teams', ['foos.teams.controllers', 'foos.teams.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/teams/new', { templateUrl: '/templates/teams/form.html' })
      .when('/teams/challenge', { templateUrl: '/templates/teams/challenge.html' })
      .when('/teams/:id', { templateUrl: '/templates/teams/show.html' })
      .when('/teams/:id/games', {templateUrl: '/templates/teams/games.html' })
      .when('/teams', { templateUrl: '/templates/teams/index.html' })
      .when('/ladder', { templateUrl: '/templates/teams/ladder.html'})
      .when('/rankings', { templateUrl: '/templates/teams/rankings.html' });
  }]);

//= require modules/teams/controllers
//= require modules/teams/services