angular.module('foos.games.controllers', [])
  .controller('RecentGamesController', ['$scope', 'GameService', 'Authentication', function($scope, Game, Auth) {
    $scope.my_team = Auth.team();
    $scope.limit = 5;

    Game.query({ order: '-created_at', limit: $scope.limit }).$promise.then(function(games) {
      $scope.recent_games = games;
    });
  }])
  .controller('GamesController', ['$scope','$routeParams','GameService', 'Authentication', function($scope, $routeParams, GameService, Auth) {
    $scope.my_team = Auth.team();

    $scope.index = function() {
      $scope.page_size = 10;
      $scope.page = 1;

      GameService.query({order: '-created_at', offset: ($scope.page - 1) * $scope.page_size, limit: $scope.page_size}, function(games, headers) {
        $scope.games = games;
        $scope.total = headers('x-total-resources');
        $scope.pages = Math.ceil($scope.total / $scope.page_size);
      });
    };

    $scope.goToPage = function(page) {
      $scope.page = page;
      GameService.query({order: '-created_at', offset: ($scope.page - 1) * $scope.page_size, limit: $scope.page_size}, function(games, headers) {
        $scope.games = games;
        $scope.total = headers('x-total-resources');
        $scope.pages = Math.ceil($scope.total / $scope.page_size);
      });
    }

    $scope.getNumber = function(number) {
      return new Array(number);
    };

    $scope.show = function() {
      GameService.get({ id: $routeParams.id }).$promise.then(function(game) {
        $scope.game = game;
      });
    };

    $scope.vs = function() {
      if (current_user && current_user.teams) {
        $scope.current_team_id = current_user.teams[0].id;
      }

      var team1_id = $routeParams.team1_id;
      var team2_id = $routeParams.team2_id;

      GameService.query({ teams: [team1_id, team2_id].join(',') }).$promise.then(function(games) {
        $scope.games = games;
      });
    }
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
  }]);