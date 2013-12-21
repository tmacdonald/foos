var app = angular.module('foos.app', ['ngRoute', 'ngResource', 'ngAnimate', 'foos.teams', 'foos.games']);

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

angular.module('foos.games', ['foos.games.controllers', 'foos.games.services'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/games/new', { templateUrl: '/assets/games/form.html' })
      .when('/games', { templateUrl: '/assets/games/index.html' });
  });

angular.module('foos.games.controllers', [])
  .controller('GamesController', function($scope, $routeParams, GameService) {
    $scope.find = function(query) {
      GameService.query(query).$promise.then(function(games) {
        $scope.games = games;
      });
    };

    $scope.findOne = function() {
      GameService.get({ id: $routeParams.id }).$promise.then(function(game) {
        $scope.game = game;
      });
    };
  });

angular.module('foos.games.services', [])
  .factory('GameService', ['$resource', function($resource) {
    return $resource('/api/games/:id', { id: '@id' });
  }]);