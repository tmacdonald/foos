angular.module('foos.teams.controllers')

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
    
  }]);