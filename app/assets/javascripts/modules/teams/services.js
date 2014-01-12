angular.module('foos.teams.services', ['ngResource'])
  .factory('TeamService', ['$resource', function($resource) {
    return $resource('/api/teams/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' }
      });
  }])
  .factory('TeamGameService', ['$resource', function($resource) {
    return $resource('/api/teams/:team_id/games', {}, {});
  }])
  .factory('StatsService', ['$resource', function($resource) {
    return $resource('/api/teams/:team_id/stats', {}, 
      {
        'query': { method: 'GET', isArray: false }
      });
  }]);