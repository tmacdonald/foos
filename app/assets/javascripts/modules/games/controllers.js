angular.module('foos.games.controllers', [])
  .controller('GamesController', ['$scope','$routeParams','$location','GameService', 'Authentication', function($scope, $routeParams, $location, GameService, Auth) {
    $scope.my_team = Auth.team();

    $scope.index = function() {
      $scope.page_size = 10;
      $scope.page = parseInt($routeParams.page) || 1;

      GameService.query({order: '-created_at', offset: ($scope.page - 1) * $scope.page_size, limit: $scope.page_size}, function(games, headers) {
        $scope.games = games;
        $scope.total = headers('x-total-resources');
        $scope.pages = Math.ceil($scope.total / $scope.page_size);
      });
    };

    $scope.getNumber = function(number) {
      return new Array(number);
    };

    $scope.show = function() {
      GameService.get({ id: $routeParams.id }).$promise.then(function(game) {
        $scope.game = game;
      });
    };
  }])

  .controller('GameSimulationController', ['$scope', 'GameService', function($scope, Game) {
    $scope.simulation = {
      score1: 10,
      score2: 0,
      points1: 500,
      points2: 500
    };

    $scope.simulate = function() {
      Game.simulate($scope.simulation).$promise.then(function(data) {
        $scope.points = data.points;
      });
    };
  }])
  .controller('NewGameController', ['$scope','$location','GameService','TeamService', function($scope, $location, GameService, TeamService) {
    $scope.game = new GameService();
    $scope.game.team1score = 10;

    TeamService.query({ order: '+name' }).$promise.then(function(teams) {
      $scope.teams = teams;
    });

    $scope.save = function() {
      $scope.errors = {};
      $scope.game.$save().then(function() {
        $location.path('/');
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
  }])
  .controller('NewGamePreviewController', ['$scope','$location','GameService','TeamService', function($scope, $location, GameService, TeamService) {
    $scope.game = new GameService();
    $scope.game.team1score = 10;

    TeamService.query({ order: '+name' }).$promise.then(function(teams) {
      $scope.teams = teams;
    });

    $scope.save = function() {
      $scope.errors = {};
      $scope.game.$save().then(function() {
        $location.path('/');
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

    $scope.selectWinner = function(team) {
      $scope.game.team1_id = team.id;
    };

    $scope.selectLoser = function(team) {
      $scope.game.team2_id = team.id;
    };

    $scope.selectScore = function(score) {
      $scope.team2score = score;
    }

    $scope.getNumber = function(number) {
      return new Array(number);
    };
  }]);

//= require 'modules/games/controllers/recent_games_controller'
//= require 'modules/games/controllers/vs_games_controller'