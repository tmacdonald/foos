angular.module('foos.dashboard', ['foos.dashboard.controllers'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/dashboard', { templateUrl: '/templates/dashboard/dashboard.html' })
  }]);