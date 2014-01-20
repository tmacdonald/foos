angular.module('foos.teams.controllers')

  .controller('VsChallengesController', ['$scope', 'ChallengeService', 'Authentication', function($scope, Challenge, Auth) {

    $scope.my_team = Auth.team();

    $scope.$watch('team', function(team) {
      Challenge.query({ challenger: $scope.my_team.id, challengee: team.id }).$promise.then(function(challenges) {
        $scope.existing_challenges = challenges;
      });
      Challenge.query({ challenger: team.id, challengee: $scope.my_team.id }).$promise.then(function(challenges) {
        $scope.already_challenged = challenges;
      });
    });

    $scope.challenge = function() {
      var challenge = new Challenge();
      challenge.challengee_id = $scope.team.id;
      challenge.$save().then(function(data) {
        $scope.existing_challenges = [challenge];
      });
    };
    
  }]);