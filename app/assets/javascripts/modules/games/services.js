angular.module('foos.games.services', [])
  .factory('GameService', ['$resource', function($resource) {
    return $resource('/api/games/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' }
      });
  }]);