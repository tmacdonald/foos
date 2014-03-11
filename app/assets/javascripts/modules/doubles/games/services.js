angular.module('foos.doubles.games.services', ['ngResource'])
  .factory('DoublesGameService', ['$resource', function($resource) {
    return $resource('/api/doubles_games/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' }
      });
  }]);