angular.module('app').controller('mvSignupCtrl', function ($scope, mvUser, mvNotifier, $location, mvAuth) {

    $scope.signup = function () {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname,
            city: $scope.city
        };

        mvAuth.createUser(newUserData).then(function () {
            mvNotifier.notify('User account created!');
            $location.path('/');
        }, function (reason) {
            mvNotifier.error(reason);
        })
    }

    // For search api with GOOGLE
    $scope.options = {
        country: 'isr',
        types: '(cities)'
    };

})