angular.module('foos.dashboard.controllers')
  
  .controller('StandingsController', ['$scope', 'TeamService', 'DoublesTeamService', 'TeamUtils', 'Authentication', function($scope, Team, DoublesTeam, TeamUtils, Auth) {
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

    DoublesTeam.query({ order: '-wins' }).$promise.then(function(teams) {
      $scope.doubles_teams = teams;
    })
  }]);