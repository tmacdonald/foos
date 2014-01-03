//= require modules/challenges/module
//= require modules/users/module
//= require modules/teams/module
//= require modules/games/module

var app = angular.module('foos.app', ['ngRoute', 'ngResource', 'ngAnimate', 'foos.users', 'foos.teams', 'foos.games', 'foos.challenges']);

app.config(['$routeProvider', 'AuthenticationService', function($routeProvider, Auth) {
  if (Auth.isLoggedIn()) {
    $routeProvider.otherwise({ redirectTo: '/users/profile' });
  } else {
    $routeProvider.otherwise({ redirectTo: '/rankings' });
  }
  
}]);













