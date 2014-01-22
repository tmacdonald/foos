var app = angular.module('foos.gameon', ['ngResource', 'ngAnimate', 'foos.authentication', 'foos.teams.services', 'foos.games.services']);

app.controller('GameOnController', ['$scope', '$window', 'TeamService', 'GameService', function($scope, $window, Team, Game) {
  $scope.wizard = 1;
  $scope.game = new Game();
  $scope.game.team1score = 10;

  Team.query().$promise.then(function(teams) {
    $scope.teams = teams;
  });

  $scope.selectTeam1 = function(team1) {
    $scope.team1 = team1;
    $scope.game.team1_id = team1.id;
    next();
  };

  $scope.selectTeam2 = function(team2) {
    $scope.team2 = team2;
    $scope.game.team2_id = team2.id;
    next();
  };

  $scope.selectScore = function(score) {
    $scope.game.team2score = score;
    next();
  };

  function next() {
    $scope.wizard = $scope.wizard + 1;
  }

  $scope.confirm = function() {
    $scope.game.$save().then(function() {
      $window.location.href = '/';
    });
  }

  $scope.getNumber = function(number) {
    return new Array(number);
  };
}]);
