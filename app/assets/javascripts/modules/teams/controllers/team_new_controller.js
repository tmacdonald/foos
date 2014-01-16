angular.module('foos.teams.controllers')
  .controller('TeamNewController', ['$scope', 'TeamService', function($scope, Team) {

    $scope.team = new Team();
    
    $scope.save = function() {
      $scope.team.$save().then(function() {
        $location.path('/rankings');
      });
    };
  }]);