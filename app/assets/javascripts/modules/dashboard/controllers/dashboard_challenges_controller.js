angular.module('foos.dashboard.controllers')
  
  .controller('DashboardChallengesController', ['$scope', 'ChallengeService', 'Authentication', function($scope, Challenge, Auth) {

    $scope.my_team = Auth.team();

    Challenge.query({ challengee: $scope.my_team.id }).$promise.then(function(challenges) {
      $scope.challenges = challenges;
    });

  }]);