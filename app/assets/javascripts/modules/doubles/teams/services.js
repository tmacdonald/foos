angular.module('foos.doubles.teams.services', ['ngResource'])
  .factory('DoublesTeamService', ['$resource', function($resource) {
    return $resource('/api/doubles_teams/:id', 
      { id: '@id' },
      {
        'update': { method: 'PUT' }
      });
  }]);