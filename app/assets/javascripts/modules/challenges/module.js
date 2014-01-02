angular.module('foos.challenges', ['foos.challenges.controllers', 'foos.challenges.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/challenges/new', { templateUrl: '/templates/challenges/form.html' })
      .when('/challenges', { templateUrl: '/templates/challenges/index.html' });
  }]);

//= require modules/challenges/controllers
//= require modules/challenges/services

