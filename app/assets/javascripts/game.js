var app = angular.module('foos.gameon', ['ngRoute', 'ngResource', 'ngAnimate', 'foos.authentication', 'foos.teams.services', 'foos.games.services'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/winner', { templateUrl: '/templates/game/winner.html' })
    .when('/loser', { templateUrl: '/templates/game/loser.html' })
    .when('/score', { templateUrl: '/templates/game/score.html' })
    .when('/confirm', { templateUrl: '/templates/game/confirm.html' })
    .otherwise({ redirectTo: '/winner' });
}]);

app.controller('RedirectController', ['$scope', '$location', function($scope, $location) {
  if (!$scope.game.team1_id) {
    $location.path('/');
  }
}]);

app.controller('GameOnController', ['$scope', '$window', '$location', 'TeamService', 'GameService', function($scope, $window, $location, Team, Game) {
  $scope.game = new Game();
  $scope.game.team1score = 10;

  Team.query({ order: '+name' }).$promise.then(function(teams) {
    $scope.teams = teams;
  });

  $scope.selectTeam1 = function(team1) {
    $scope.team1 = team1;
    $scope.game.team1_id = team1.id;
    $location.path('/loser');
  };

  $scope.selectTeam2 = function(team2) {
    $scope.team2 = team2;
    $scope.game.team2_id = team2.id;
    $location.path('/score');
  };

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
