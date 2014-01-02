//= require modules/challenges/module
//= require modules/users/module
//= require modules/teams/module
//= require modules/games/module

var app = angular.module('foos.app', ['ngRoute', 'ngResource', 'ngAnimate', 'foos.teams', 'foos.games', 'foos.challenges']);

app.config(function($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/rankings' });
});













