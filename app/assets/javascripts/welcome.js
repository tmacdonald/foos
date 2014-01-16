var app = angular.module('foos.app', ['ngRoute', 'ngResource', 'ngAnimate', 'foos.users', 'foos.teams', 'foos.games', 'foos.challenges', 'foos.authentication', 'foos.dashboard']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/dashboard' });
}]);













