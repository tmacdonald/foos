angular.module('foos.challenges.controllers', []) 
  .controller('ChallengesController', ['$scope', 'ChallengeService', 'TeamService', 'AuthenticationService', function($scope, Challenge, Team, Auth) {
    $scope.notifications = [];

    $scope.find = function() {
      Challenge.query().$promise.then(function(challenges) {
        $scope.challenges = challenges;
      });
    };

    $scope.initChallenge = function() {
      $scope.user = Auth.getCurrentUser();
      Challenge.query().$promise.then(function(challenges) {
        $scope.challenges = challenges;
      });

      $scope.loadTeams();
    };

    $scope.hasChallenged = function(team) {
      return $scope.challenges.some(function(challenge) {
        return challenge.challengee.id == team.id;
      })
    };

    $scope.loadTeams = function() {
      Team.query().$promise.then(function(teams) {
        $scope.teams = teams.filter(function(team) {
          return team.id != user.team.id;
        });
      });
    };

    $scope.save = function() {
      $scope.challenge.$save().then(function() {
        
      });
    };

    $scope.challenge = function(team) {
      var challenge = new Challenge();
      challenge.challengee_id = team.id;

      challenge.$save().then(function() {
        $scope.notifications.push('You have challenged ' + team.name +'!');
      });
    };
  }]);