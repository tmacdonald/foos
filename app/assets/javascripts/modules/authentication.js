angular.module('foos.authentication', []);

angular.module('foos.authentication')
  .service('AuthenticationService', '$window', [function($window) {
    return {
      getCurrentUser: function() {
        return $window.current_user;
      }
    };
  }]);