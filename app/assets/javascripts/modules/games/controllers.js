angular.module('foos.games.controllers', [])
  .controller('GamesController', ['$scope','$routeParams','GameService', function($scope, $routeParams, GameService) {
    $scope.find = function() {
      GameService.query({ team1_id: $routeParams.team1_id, team2_id: $routeParams.team2_id }).$promise.then(function(games) {
        $scope.games = games;
      });
    };

    $scope.findOne = function() {
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

    TeamService.query().$promise.then(function(teams) {
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
  }]);