angular.module('foos.teams.controllers')
  .controller('TeamNewController', ['$scope', '$location', 'TeamService', function($scope, $location, Team) {

    $scope.team = new Team();
    
    $scope.save = function() {
      $scope.team.$save().then(function() {
        $location.path('/rankings');
      });
    };
  }]);