angular.module('foos.authentication', []);

angular.module('foos.authentication')
  .factory('Authentication', ['$window', function($window) {
    return {
      user: function() {
        return $window.current_user;
      },
      team: function() {
        var user = this.user();
        if (user && user.teams) {
          return user.teams[0];
        }
      },
      is_my_team: function(team_id) {
        return this.team() && this.team().id == team_id;
      }
    };
  }]);