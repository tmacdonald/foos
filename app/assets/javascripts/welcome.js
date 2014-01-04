//= require modules/challenges/module
//= require modules/users/module
//= require modules/teams/module
//= require modules/games/module
//= require modules/authentication

var app = angular.module('foos.app', ['ngRoute', 'ngResource', 'ngAnimate', 'foos.users', 'foos.teams', 'foos.games', 'foos.challenges', 'foos.authentication', 'foos.dashboard']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/dashboard' });
}]);













