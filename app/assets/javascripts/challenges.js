angular.module('foos.challenges', ['foos.challenges.controllers', 'foos.challenges.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/challenges/new', { templateUrl: '/templates/challenges/form.html' })
      .when('/challenges', { templateUrl: '/templates/challenges/index.html' });
  }]);

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

angular.module('foos.challenges.services', [])
  .factory('ChallengeService', ['$resource', function($resource) {
    return $resource('/api/challenges/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' }
      });
  }]);