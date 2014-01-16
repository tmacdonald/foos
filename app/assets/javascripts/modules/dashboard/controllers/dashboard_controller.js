angular.module('foos.dashboard.controllers')

  .controller('DashboardController', ['$scope', '$location', 'Authentication', function($scope, $location, Auth) {

    $scope.my_team = Auth.team();

  }]);