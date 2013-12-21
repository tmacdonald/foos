var app = angular.module('foos.app', ['ngRoute', 'ngResource', 'ngAnimate', 'foos.teams']);

app.config(function($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/teams' });
});

var teamModule = angular.module('foos.teams', ['foos.teams.controllers', 'foos.teams.services'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/teams/new', { templateUrl: '/assets/teams/form.html', controller: 'NewTeamController' })
      .when('/teams/:id', { templateUrl: '/assets/teams/show.html' })
      .when('/teams', { templateUrl: '/assets/teams/index.html' })
      .when('/ladder', { templateUrl: '/assets/teams/ladder.html'})
      .when('/rankings', { templateUrl: '/assets/teams/rankings.html' });
  });

angular.module('foos.teams.controllers', [])
  .controller('TeamsController', function($scope, $routeParams, TeamService) {
    $scope.find = function(query) {
      TeamService.query(query).$promise.then(function(teams) {
        $scope.teams = teams;
      });
    };

    $scope.findOne = function() {
      TeamService.get({ id: $routeParams.id }).$promise.then(function(team) {
        $scope.team = team;
      });
    };
  })
  .controller('NewTeamController', function($scope) {

  });

angular.module('foos.teams.services', ['ngResource'])
  .factory('TeamService', ['$resource', function($resource) {
    return $resource('/api/teams/:id', { id: '@id' });
  }]);