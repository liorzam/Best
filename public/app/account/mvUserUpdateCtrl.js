angular.module('app').controller('mvUserUpdateCtrl', function ($scope, mvAuth, mvIdentity, mvNotifier) {
    $scope.email = mvIdentity.currentUser.username;
    $scope.fname = mvIdentity.currentUser.firstName;
    $scope.lname = mvIdentity.currentUser.lastName;
    $scope.city = mvIdentity.currentUser.city;

    $scope.update = function () {
        var newUserData = {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname,
            city: $scope.city
        }

        if ($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function () {
            mvNotifier.notify('Your user account has been updated');
        }, function (reason) {
            mvNotifier.error(reason);
        })
    };

    // For search api with GOOGLE
    $scope.options = {
        country: 'isr',
        types: '(cities)'
    };
})