angular.module('foos.dashboard', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/mydashboard', { templateUrl: '/templates/mydashboard.html' })
      .when('/dashboard', { templateUrl: '/templates/dashboard.html' })
  }]);

angular.module('foos.dashboard')
  .controller('DashboardController', ['$scope', '$http', '$window', '$location', 'TeamService', 'GameService', function($scope, $http, $window, $location, Team, Game) {

    $scope.dashboard = function() {
      if (current_user) {
        $location.path('/mydashboard');
      } else {
        Game.recent_games().$promise.then(function(games) {
          $scope.recent_games = games;
        });

        Team.query().$promise.then(function(teams) {
          $scope.teams = teams;
        });  
      }
    };

    $scope.my_dashboard = function() {
      if (!current_user) {
        $location.path('/dashboard');
      } else {
        $scope.current_team_id = current_user.teams[0].id;

        Team.recent_games({ id: $scope.current_team_id }).$promise.then(function(games) {
          $scope.team_recent_games = games;
        });

        Game.recent_games().$promise.then(function(games) {
          $scope.recent_games = games;
        });

        Team.ladder().$promise.then(function(teams) {
          $scope.ladder = teams;
        });

        Team.rankings().$promise.then(function(teams) {
          $scope.rankings = teams;
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