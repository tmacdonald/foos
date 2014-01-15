angular.module('foos.dashboard', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/mydashboard', { templateUrl: '/templates/dashboard/mydashboard.html' })
      .when('/dashboard', { templateUrl: '/templates/dashboard/dashboard.html' })
  }]);

angular.module('foos.dashboard')
  
  .controller('DashboardChallengesController', ['$scope', 'ChallengeService', 'Authentication', function($scope, Challenge, Auth) {

    $scope.my_team = Auth.team();

    Challenge.query({ challengee: $scope.my_team.id }).$promise.then(function(challenges) {
      $scope.challenges = challenges;
    });

  }])

  .controller('StandingsController', ['$scope', 'TeamService', 'TeamUtils', 'Authentication', function($scope, Team, TeamUtils, Auth) {
    $scope.limit = 5;

    $scope.my_team = Auth.team();
    $scope.winPercentage = TeamUtils.winPercentage;

    $scope.teamInvisibleInStandings = false;

    Team.query({ order: '-points' }).$promise.then(function(teams) {
      var i;

      $scope.teams = teams;

      for (i = 0; i < teams.length; i = i + 1) {
        if ($scope.my_team && teams[i].id == $scope.my_team.id) {
          $scope.team = teams[i];
          if (i > $scope.limit - 1) {
            $scope.teamInvisibleInStandings = i + 1;
          }
          break;
        }
      }
    });
  }])
  .controller('DashboardController', ['$scope', '$location', 'Authentication', function($scope, $location, Auth) {

    $scope.limit = 5;
    $scope.my_team = Auth.team();

    if ($scope.my_team) {
      $location.path('/mydashboard');
    } 
  }])

  .controller('MyRecentGamesController', ['$scope', 'TeamGameService', 'Authentication', function($scope, TeamGame, Auth) {

    $scope.my_team = Auth.team();

    TeamGame.query({ team_id: $scope.my_team.id, order: '-created_at', limit: $scope.limit }).$promise.then(function(games) {
      $scope.team_recent_games = games;
    });  

  }])

  .controller('MyDashboardController', ['$scope', '$location', 'Authentication', function($scope, $location, Auth) {

    $scope.my_team = Auth.team();

    if (!$scope.my_team) {
      $location.path('/dashboard');
    }

  }]);