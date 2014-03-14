angular.module('foos.teams.services', ['ngResource'])
  .factory('TeamService', ['$resource', function($resource) {
    return $resource('/api/teams/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' },
        'doubles': { url: '/api/teams/doubles', method: 'GET', isArray: true }
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
  }])
  .factory('TeamUtils', [function() {
    return {
      winPercentage: function(team) {
        if (team.stats.wins == 0 && team.stats.losses == 0) {
          return 0;
        }
        return 100.0 * team.stats.wins / (team.stats.wins + team.stats.losses);
      }
    };
  }]);