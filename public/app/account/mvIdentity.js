angular.module('app').factory('mvIdentity', function(mvUser) {
  var currentUser;

  return {
    currentUser: currentUser,
      
    isAuthenticated: function() {
      return !!this.currentUser;
    },
      
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  }
})