var userModule = angular.module('foos.users', ['foos.users.controllers', 'foos.users.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/users/profile', { templateUrl: '/templates/users/profile.html' })
  }]);

//= require modules/users/controllers
//= require modules/users/services