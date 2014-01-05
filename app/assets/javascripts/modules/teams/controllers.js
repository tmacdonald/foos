angular.module('foos.teams.controllers', [])
  .controller('TeamsController', ['$scope','$http','$routeParams','TeamService', function($scope, $http, $routeParams, Team) {
    $scope.find = function(query) {
      Team.query(query).$promise.then(function(teams) {
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

      Team.get({ id: $scope.team_id }).$promise.then(function(team) {
        $scope.team = team;
      });

      Team.recent_games({ id: $scope.team_id }).$promise.then(function(games) {
        $scope.recent_games = games;
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
  .controller('TeamGamesController', ['$scope','$http','$routeParams', 'TeamService', function($scope, $http, $routeParams, Team) {
    $scope.team_id = $routeParams.id;

    $scope.init = function() {
      Team.get({ id: $scope.team_id }).$promise.then(function(team) {
        $scope.team = team;
      });

      Team.games({ id: $scope.team_id }).$promise.then(function(games) {
        $scopes.games = games;
      });
    };

    $scope.isWinner = function(game) {
      return $scope.team_id == game.team1.id;
    };

    $scope.isCurrentTeam = function(team_id) {
      return team_id == $scope.team_id;
    };
  }]);