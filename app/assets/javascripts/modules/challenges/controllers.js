angular.module('foos.challenges.controllers', []) 
  .controller('ChallengesController', ['$scope', 'ChallengeService', 'TeamService', function($scope, Challenge, Team) {
    $scope.find = function() {
      Challenge.query().$promise.then(function(challenges) {
        $scope.challenges = challenges;
      });
    };

    $scope.initForm = function() {
      $scope.challenge = new Challenge();

      $scope.loadTeams();
    };

    $scope.loadTeams = function() {
      Team.query().$promise.then(function(teams) {
        $scope.teams = teams;
      });
    };

    $scope.save = function() {
      $scope.challenge.$save().then(function() {
        
      });
    }
  }]);