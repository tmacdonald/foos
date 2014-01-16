angular.module('foos.teams.controllers')
  .controller('TeamGamesController', ['$scope', '$routeParams', 'TeamService', 'TeamGameService', function($scope, $routeParams, Team, Game) {

    $scope.page_size = 10;
    $scope.page = parseInt($routeParams.page) || 1;
    $scope.team_id = $routeParams.id;

    Team.get({ id: $scope.team_id }).$promise.then(function(team) {
      $scope.team = team;
    });

    Game.query({ team_id: $scope.team_id, order: '-created_at', offset: ($scope.page - 1) * $scope.page_size, limit: $scope.page_size }, function(games, headers) {
      $scope.games = games;
      $scope.total = headers('x-total-resources');
      $scope.pages = Math.ceil($scope.total / $scope.page_size);
    });

    // TODO Redundant - Create a pagination service
    $scope.getNumber = function(number) {
      return new Array(number);
    };

    $scope.isWinner = function(game) {
      return $scope.team_id == game.team1.id;
    };

    $scope.isCurrentTeam = function(team_id) {
      return team_id == $scope.team_id;
    };
  }]);

   