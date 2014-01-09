angular.module('foos.games.services', [])
  .factory('GameService', ['$http', '$resource', function($http, $resource) {
    return $resource('/api/games/:id', 
      { id: '@id' },
      {
        'query': {
          method: 'GET',
          isArray: true,
          transformResponse: [function(data, headers) {
            var total = headers('x-total-resources');
            return data;
          }].concat($http.defaults.transformResponse)
        },
        'update': { method: 'PUT' },
        'recent_games': { method: 'GET', url: '/api/games/recent', isArray: true},
        'simulate': { method: 'GET', url: '/api/games/calculate' }
      });
  }]);