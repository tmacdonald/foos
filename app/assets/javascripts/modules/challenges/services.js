angular.module('foos.challenges.services', [])
  .factory('ChallengeService', ['$resource', function($resource) {
    return $resource('/api/challenges/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' }
      });
  }]);