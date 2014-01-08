angular.module('foos.teams.controllers', [])
  .controller('TeamsController', ['$scope','$http','$routeParams','$location','TeamService', function($scope, $http, $routeParams, $location, Team) {

    $scope.index = function(query) {
      Team.query(query).$promise.then(function(teams) {
        $scope.teams = teams;
      });
    }

    $scope.show = function() {
      if (current_user && current_user.teams) {
        $scope.my_team = current_user.teams[0];
      }

      $scope.Math = window.Math;
      $scope.team_id = $routeParams.id;

      Team.get({ id: $scope.team_id }).$promise.then(function(team) {
        $scope.team = team;
      });

      Team.recent_games({ id: $scope.team_id }).$promise.then(function(games) {
        $scope.recent_games = games;
      });
    };

    $scope.add = function() {
      $scope.team = new Team();
    };

    $scope.save = function() {
      $scope.team.$save().then(function() {
        $location.path('/rankings');
      });
    };

    $scope.games = function() {
      $scope.team_id = $routeParams.id;

      Team.get({ id: $scope.team_id }).$promise.then(function(team) {
        $scope.team = team;
      });

      Team.games({ id: $scope.team_id }).$promise.then(function(games) {
        $scope.games = games;
      });
    };

    $scope.isWinner = function(game) {
      return $scope.team_id == game.team1.id;
    };

    $scope.isCurrentTeam = function(team_id) {
      return team_id == $scope.team_id;
    };

    $scope.winPercentage = function(team) {
      if (team.stats.wins == 0 && team.stats.losses == 0) {
        return 0;
      }
      return 100.0 * team.stats.wins / (team.stats.wins + team.stats.losses);
    };
  }]);