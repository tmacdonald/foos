var app = angular.module('foos.doublesgame', ['ngRoute', 'ngResource', 'ngAnimate', 'foos.authentication', 'foos.teams.services', 'foos.doubles.games.services'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/winner', { templateUrl: '/templates/doubles/game/winner.html' })
    .when('/loser', { templateUrl: '/templates/doubles/game/loser.html' })
    .when('/score', { templateUrl: '/templates/doubles/game/score.html' })
    .when('/confirm', { templateUrl: '/templates/doubles/game/confirm.html' })
    .otherwise({ redirectTo: '/winner' });
}]);

app.controller('RedirectController', ['$scope', '$location', function($scope, $location) {
  if (!$scope.game.winner_team1_id) {
    $location.path('/');
  }
}]);

app.controller('DoublesGameController', ['$scope', '$window', '$location', 'TeamService', 'DoublesGameService', function($scope, $window, $location, Team, Game) {
  $scope.game = new Game();

  Team.query({ order: '+name' }).$promise.then(function(teams) {
    $scope.teams = teams;
  });

  var checkWinner = function() {
    if ($scope.winner1 && $scope.winner2) {
      $location.path('/loser');
    }
  };

  var checkLoser = function() {
    if ($scope.loser1 && $scope.loser2) {
      $location.path('/score');
    }
  };

  $scope.selectWinner1 = function(winner) {
    $scope.winner1 = winner;
    $scope.game.winner_team1_id = winner.id;
    checkWinner();
  };

  $scope.selectWinner2 = function(winner) {
    $scope.winner2 = winner;
    $scope.game.winner_team2_id = winner.id;
    checkWinner();
  };

  $scope.selectLoser1 = function(loser) {
    $scope.loser1 = loser;
    $scope.game.loser_team1_id = loser.id;
    checkLoser();
  };

  $scope.selectLoser2 = function(loser) {
    $scope.loser2 = loser;
    $scope.game.loser_team2_id = loser.id;
    checkLoser();
  }

  $scope.selectScore = function(score) {
    $scope.game.team2score = score;
    $location.path('/confirm');
  };

  $scope.confirm = function() {
    $scope.game.$save().then(function() {
      $window.location.href = '/';
    });
  }

  $scope.getNumber = function(number) {
    return new Array(number);
  };
}]);
