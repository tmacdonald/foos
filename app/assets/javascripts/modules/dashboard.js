angular.module('foos.dashboard', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/dashboard', { templateUrl: '/templates/dashboard.html' })
  }]);

angular.module('foos.dashboard')
  .controller('DashboardController', ['$scope', '$http', '$window', 'TeamService', function($scope, $http, $window, Team) {

    $scope.init = function() {
      $http({
        method: 'GET',
        url: '/api/games/recent'        
      }).then(function(games) {
        $scope.recent_games = games.data;
      });  

      Team.query().$promise.then(function(teams) {
        $scope.teams = teams;
      })
    };

    $scope.playedToday = function(game) {
      return (new $window.Date(game.created_at)).toDateString() == (new $window.Date()).toDateString();
    };

    

  }]);