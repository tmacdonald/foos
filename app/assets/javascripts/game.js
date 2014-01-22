var app = angular.module('foos.gameon', ['ngResource', 'ngAnimate', 'foos.authentication']);

app.controller('GameOnController', ['$scope', function($scope) {
  $scope.wizard = 1;

  $scope.next = function() {
    $scope.wizard = $scope.wizard + 1;
  };

  $scope.previous = function() {
    $scope.wizard = $scope.wizard - 1;
  }
}]);
