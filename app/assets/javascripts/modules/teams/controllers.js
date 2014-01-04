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
  .controller('TeamGamesController', ['$scope','$http','$routeParams', 'TeamService', function($scope, $http, $routeParams, Team) {
    $scope.team_id = $routeParams.id;

    $scope.init = function() {
      Team.get({ id: $scope.team_id }).$promise.then(function(team) {
        $scope.team = team;
      });

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