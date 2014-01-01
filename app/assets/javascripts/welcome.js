var app = angular.module('foos.app', ['ngRoute', 'ngResource', 'ngAnimate', 'foos.teams', 'foos.games']);

app.config(function($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/rankings' });
});

var userModule = angular.module('foos.users', ['foos.users.controllers', 'foos.users.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/users/profile', { templateUrl: '/templates'})
  }]);

var teamModule = angular.module('foos.teams', ['foos.teams.controllers', 'foos.teams.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/teams/new', { templateUrl: '/templates/teams/form.html', controller: 'NewTeamController' })
      .when('/teams/:id', { templateUrl: '/templates/teams/show.html' })
      .when('/teams/:id/games', {templateUrl: '/templates/teams/games.html' })
      .when('/teams', { templateUrl: '/templates/teams/index.html' })
      .when('/ladder', { templateUrl: '/templates/teams/ladder.html'})
      .when('/rankings', { templateUrl: '/templates/teams/rankings.html' });
  }]);

angular.module('foos.teams.controllers', [])
  .controller('TeamsController', ['$scope','$http','$routeParams','TeamService', function($scope, $http, $routeParams, TeamService) {
    $scope.find = function(query) {
      TeamService.query(query).$promise.then(function(teams) {
        $scope.teams = teams.map(function(team) {
          if (team.users.some(function(user) {
            team.current_user = true;
          }));
          return team;
        });
      });
    };

    $scope.findOne = function() {
      $scope.Math = window.Math;
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
      return $scope.team_id == game.team1.id;
    };

    $scope.isCurrentTeam = function(team_id) {
      return team_id == $scope.team_id;
    };
  }])
  .controller('NewTeamController', ['$scope','$location','TeamService', function($scope, $location, TeamService) {
    $scope.team = new TeamService();

    $scope.save = function() {
      $scope.team.$save().then(function() {
        $location.path('/rankings');
      });
    };
  }])
  .controller('TeamGamesController', ['$scope','$http','$routeParams', function($scope, $http, $routeParams) {
    $scope.team_id = $routeParams.id;

    $scope.load_games = function() {
      $http({
        method: 'GET',
        url: '/api/teams/' + $scope.team_id + '/games'
      }).then(function(games) {
        $scope.games = games.data;
      });  
    };

    $scope.isWinner = function(game) {
      return $scope.team_id == game.team1.id;
    };

    $scope.isCurrentTeam = function(team_id) {
      return team_id == $scope.team_id;
    };
  }]);

angular.module('foos.teams.services', ['ngResource'])
  .factory('TeamService', ['$resource', function($resource) {
    return $resource('/api/teams/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' },
      });
  }]);

angular.module('foos.games', ['foos.games.controllers', 'foos.games.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/games/new', { templateUrl: '/templates/games/form.html', controller: "NewGameController" })
      .when('/games', { templateUrl: '/templates/games/index.html' });
  }]);

angular.module('foos.games.controllers', [])
  .controller('GamesController', ['$scope','$routeParams','GameService', function($scope, $routeParams, GameService) {
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
  }])
  .controller('NewGameController', ['$scope','$location','GameService','TeamService', function($scope, $location, GameService, TeamService) {
    $scope.game = new GameService();
    $scope.game.team1score = 10;

    TeamService.query().$promise.then(function(teams) {
      $scope.teams = teams;
    });

    $scope.save = function() {
      $scope.errors = {};
      $scope.game.$save().then(function() {
        $location.path('/rankings');
      }, function(reason) {
        if (reason.status === 422) {
          var errors = reason.data.errors;
          for (var error in errors) {
            if (errors.hasOwnProperty(error)) {
              $scope.form[error].$setValidity('validation', false);
              $scope.errors[error] = errors[error].join(', ');
            }
          }
        }
      });
    };
  }]);

angular.module('foos.games.services', [])
  .factory('GameService', ['$resource', function($resource) {
    return $resource('/api/games/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' }
      });
  }]);