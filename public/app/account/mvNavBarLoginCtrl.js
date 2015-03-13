angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, $q, mvIdentity, mvNotifier, mvAuth, $location, $window) {
    $scope.identity = mvIdentity;
    console.log(mvIdentity);
    $scope.signin = function (username, password) {
        mvAuth.authenticateUser(username, password).then(function (success) {
            if (success) {
                mvNotifier.notify('You have successfully signed in!');
            } else {
                mvNotifier.error('Username/Password incorrect');
            }
        });
    }
    
    $scope.facebookSignIn = function () {
        var dfd = $q.defer();
        $http.get('/auth/facebook').then(function (response) {
            if (response.data.success) {
                var user = new mvUser();
                angular.extend(user, response.data.user);
                mvIdentity.currentUser = user;
                dfd.resolve(true);
            } else {
                dfd.resolve(false);
            }
        });
        return dfd.promise;
    };


    $scope.signout = function () {
        mvAuth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('You have successfully signed out!');
            $location.path('/');
        })
    }
});