angular.module('foos.dashboard', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/mydashboard', { templateUrl: '/templates/mydashboard.html' })
      .when('/dashboard', { templateUrl: '/templates/dashboard.html' })
  }]);

angular.module('foos.dashboard')
  .controller('StandingsController', ['$scope', 'TeamService', 'Authentication', function($scope, Team, Auth) {
    $scope.limit = 5;

    $scope.my_team = Auth.team();
    $scope.teamInvisibleInStandings = false;

    Team.query({ order: '-points' }).$promise.then(function(teams) {
      var i;

      $scope.teams = teams;

      for (i = 0; i < teams.length; i = i + 1) {
        if (teams[i].id == $scope.my_team.id) {
          $scope.team = teams[i];
          if (i > $scope.limit - 1) {
            $scope.teamInvisibleInStandings = i + 1;
          }
          break;
        }
      }
    });
  }])
  .controller('DashboardController', ['$scope', '$http', '$window', '$location', '$q', 'TeamService', 'GameService', 'Authentication', function($scope, $http, $window, $location, $q, Team, Game, Auth) {

    $scope.dashboard = function() {
      $scope.limit = 5;

      $scope.my_team = Auth.team();

      if ($scope.my_team) {
        $location.path('/mydashboard');
      } else {
        Team.query({ order: '-points', limit: $scope.limit }).$promise.then(function(teams) {
          $scope.teams = teams;
        }).then(function() {
          Game.query({ order: '-created_at', limit: $scope.limit }).$promise.then(function(games) {
            $scope.recent_games = games;
          });
        });
      }
    };

    $scope.my_dashboard = function() {
      $scope.limit = 5;

      $scope.user = Auth.user();
      $scope.my_team = Auth.team();

      if (!$scope.my_team) {
        $location.path('/dashboard');
      } else {
        
        $scope.teamInvisibleInStandings = false;

        var teamPromise = Team.query({ order: '-points', limit: $scope.limit }).$promise.then(function(teams) {
          var i;

          $scope.teams = teams;

          for (i = 0; i < teams.length; i = i + 1) {
            if (teams[i].id == $scope.my_team.id) {
              $scope.team = teams[i];
              if (i > $scope.limit - 1) {
                $scope.teamInvisibleInStandings = i + 1;
              }
              break;
            }
          }

        }).then(function() {
          Team.recent_games({ id: $scope.my_team.id }).$promise.then(function(games) {
            $scope.team_recent_games = games;
          });  

          Game.query({ order: '-created_at', limit: $scope.limit }).$promise.then(function(games) {
            $scope.recent_games = games;
          });
        });  
      }
    };

    $scope.winPercentage = function(team) {
      if (team.stats.wins == 0 && team.stats.losses == 0) {
        return 0;
      }
      return 100.0 * team.stats.wins / (team.stats.wins + team.stats.losses);
    };

    $scope.playedToday = function(game) {
      return (new $window.Date(game.created_at)).toDateString() == (new $window.Date()).toDateString();
    };
  }]);