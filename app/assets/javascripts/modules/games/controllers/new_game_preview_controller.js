angular.module('foos.games.controllers')
  .controller('NewGamePreviewController', ['$scope','$location','GameService','TeamService', function($scope, $location, GameService, TeamService) {
    $scope.game = new GameService();
    $scope.game.team1score = 10;

    TeamService.query({ order: '+name' }).$promise.then(function(teams) {
      $scope.teams = teams;
    });

    $scope.save = function() {
      $scope.errors = {};
      $scope.game.$save().then(function() {
        $location.path('/');
      }, function(reason) {
        if (reason.status === 422) {
          var errors = reason.data.errors;
          for (var error in errors) {
            if (errors.hasOwnProperty(error)) {
              $scope.form[error].$setValidity('validation', false);
              $scope.errors[error] = errors[error].join(', ');
            }
          }
        }
      });
    };

    $scope.selectWinner = function(team) {
      $scope.game.team1_id = team.id;
    };

    $scope.selectLoser = function(team) {
      $scope.game.team2_id = team.id;
    };

    $scope.selectScore = function(score) {
      $scope.team2score = score;
    }

    $scope.getNumber = function(number) {
      return new Array(number);
    };
  }]);