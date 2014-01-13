angular.module('foos.teams.controllers', [])
  
  .controller('VsStatsController', ['$scope', 'StatsService', 'Authentication', function($scope, Stats, Auth) {
    $scope.my_team = Auth.team();
    $scope.limit = 5;

    $scope.$watch('team_id', function(team_id) {
      Stats.query({ team_id: $scope.my_team.id, team: team_id }).$promise.then(function(stats) {
        $scope.stats = stats;
      });
    });
  }])

  .controller('VsRecentGamesController', ['$scope', 'GameService', 'Authentication', function($scope, Game, Auth) {
    $scope.my_team = Auth.team();
    $scope.limit = 5;

    $scope.$watch('team_id', function(team_id) {
      Game.query({ teams: [$scope.my_team.id, team_id].join(','), order: '-created_at', limit: 5 }).$promise.then(function(games) {
        $scope.recent_games = games;
      });
    });

    $scope.isWinner = function(game) {
      return $scope.my_team.id == game.team1.id;
    };

    $scope.isCurrentTeam = function(team_id) {
      return team_id == $scope.my_team.id;
    };
  }])

  .controller('VsChallengesController', ['$scope', 'ChallengeService', 'Authentication', function($scope, Challenge, Auth) {

    $scope.my_team = Auth.team();

    $scope.$watch('team_id', function(team_id) {
      Challenge.query({ challenger: $scope.my_team.id, challengee: team_id }).$promise.then(function(challenges) {
        $scope.existing_challenges = challenges;
      });
    });

    $scope.challenge = function() {
      var challenge = new Challenge();
      challenge.challengee_id = $scope.team.id;
      challenge.$save().then(function(data) {
        console.log(data);
        $scope.existing_challenges = [challenge];
      });
    };
    
  }])

  .controller('TeamRecentGamesController', ['$scope', 'TeamGameService', 'Authentication', function($scope, Game, Auth) {
    $scope.my_team = Auth.team();
    $scope.limit = 5;

    $scope.$watch('team_id', function(team_id) {
      Game.query({ team_id: team_id, order: '-created_at', limit: $scope.limit }).$promise.then(function(games) {
        $scope.recent_games = games;
      });
    });

    $scope.isWinner = function(game) {
      return $scope.team_id == game.team1.id;
    };

    $scope.isCurrentTeam = function(team_id) {
      return team_id == $scope.team_id;
    };
  }])
  .controller('TeamsController', 
    ['$scope','$http','$routeParams','$location','TeamService', 'ChallengeService', 'TeamGameService', 'Authentication', 
    function($scope, $http, $routeParams, $location, Team, Challenge, Game, Auth) {

    $scope.my_team = Auth.team();

    $scope.index = function(query) {
      Team.query(query).$promise.then(function(teams) {
        $scope.teams = teams;
      });
    }

    $scope.show = function() {
      $scope.Math = window.Math;
      $scope.team_id = $routeParams.id;

      Team.get({ id: $scope.team_id }).$promise.then(function(team) {
        $scope.team = team;
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
    };

    $scope.getNumber = function(number) {
      return new Array(number);
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