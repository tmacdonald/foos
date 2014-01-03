angular.module('foos.users.services', [])
  .factory('AuthenticationService', ['$window', function($window) {
    return {
      getCurrentUser: function() {
        return $window.user;
      },

      getCurrentTeam: function() {
        return this.getCurrentUser().team;
      },

      isLoggedIn: function() {
        return this.getCurrentUser() != null;
      }
    }
  }]);