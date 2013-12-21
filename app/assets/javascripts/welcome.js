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
  .controller('TeamsController', function($scope, $http, $routeParams, TeamService) {
    $scope.find = function(query) {
      TeamService.query(query).$promise.then(function(teams) {
        $scope.teams = teams;
      });
    };

    $scope.findOne = function() {
      $scope.team_id = $routeParams.id;

      TeamService.get({ id: $scope.team_id }).$promise.then(function(team) {
        $scope.team = team;
      });

      $http({
        method: 'GET',
        url: '/api/teams/' + $scope.team_id + '/games/recent'        
      }).then(function(games) {
        $scope.recent_games = games.data;
      });
    };

    $scope.isWinner = function(game) {
      return ($scope.team_id == game.team1.id && game.team1score > game.team2score) ||
             ($scope.team_id == game.team2.id && game.team2score > game.team1score)
    };

    $scope.isCurrentTeam = function(team_id) {
      return team_id == $scope.team_id;
    };

    $scope.getScore = function(game) {
      return Math.max(game.team1score, game.team2score) + ' - ' + Math.min(game.team1score, game.team2score);
    }
  })
  .controller('NewTeamController', function($scope) {

  });

angular.module('foos.teams.services', ['ngResource'])
  .factory('TeamService', ['$resource', function($resource) {
    return $resource('/api/teams/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' },
      });
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
    return $resource('/api/games/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' }
      });
  }]);