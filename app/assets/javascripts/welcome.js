var app = angular.module('foos.app', ['ngRoute', 'ngResource', 'foos.teams']);

app.config(function($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/teams' });
});

var teamModule = angular.module('foos.teams', ['foos.teams.controllers', 'foos.teams.services'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/teams/new', { templateUrl: '/assets/teams/form.html', controller: 'NewTeamController' })
      .when('/teams/:id', { templateUrl: '/assets/teams/show.html', controller: 'TeamController' })
      .when('/teams', { templateUrl: '/assets/teams/index.html', controller: 'TeamsController' })
      .when('/ladder', { templateUrl: '/assets/teams/ladder.html', controller: 'TeamsController' })
      .when('/rankings', { templateUrl: '/assets/teams/rankings.html', controller: 'TeamsController' });
  });

angular.module('foos.teams.controllers', [])
  .controller('LadderController', function($scope, TeamService) {

  })
  .controller('TeamsController', function($scope, TeamService) {
    $scope.teams = [];

    TeamService.query().$promise.then(function(data) { 
      $scope.teams = data;
    });
  })
  .controller('TeamController', function($scope, $routeParams, TeamService) {
    TeamService.get({ id: $routeParams.id }).$promise.then(function(data) {
      $scope.team = data;
    });
  })
  .controller('NewTeamController', function($scope) {

  });

angular.module('foos.teams.services', ['ngResource'])
  .factory('TeamService', function($resource) {
    return $resource('/api/teams/:id', { id: '@id' });
  });