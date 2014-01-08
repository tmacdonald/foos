angular.module('foos.games.services', [])
  .factory('GameService', ['$resource', function($resource) {
    return $resource('/api/games/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' },
        'recent_games': { method: 'GET', url: '/api/games/recent', isArray: true},
        'simulate': { method: 'GET', url: '/api/games/calculate' }
      });
  }]);