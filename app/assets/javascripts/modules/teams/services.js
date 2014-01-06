angular.module('foos.teams.services', ['ngResource'])
  .factory('TeamService', ['$resource', function($resource) {
    return $resource('/api/teams/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' },
        'ladder': { method: 'GET', url: '/api/teams/ladder', isArray: true },
        'rankings': { method: 'GET', url: '/api/teams/rankings', isArray: true },
        'games': { method: 'GET', url: '/api/teams/:id/games', isArray: true },
        'recent_games': { method: 'GET', url: '/api/teams/:id/games/recent', isArray: true }
      });
  }]);