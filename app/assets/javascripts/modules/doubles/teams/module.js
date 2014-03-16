angular.module('foos.doubles.teams', ['foos.doubles.teams.controllers', 'foos.doubles.teams.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/doubles/teams', { templateUrl: '/templates/doubles/teams/index.html' })
      .when('/doubles/players', { templateUrl: '/templates/doubles/players/index.html'})
  }]);
//= require modules/doubles/teams/controllers
//= require modules/doubles/teams/services