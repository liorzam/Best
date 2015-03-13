angular.module('app').controller('mvMainCtrl', function($scope, $routeParams) {
    
    console.log('MAIN CTL');
    console.log($routeParams.user);
    function authenticateUser() {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new mvUser();
          angular.extend(user, response.data.user);
          mvIdentity.currentUser = user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    }
    
  $scope.costumers = [
    {name: 'Hot', img: "vendor/app/img/hot.jpg", about:""},
    {name: 'Yes', img: "vendor/app/img/yes.jpg", about:""},
    {name: 'Pelephone', img: "vendor/app/img/pelephone.jpg", about:""}
  ]
});