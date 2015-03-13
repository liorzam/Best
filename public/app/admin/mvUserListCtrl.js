angular.module('app').controller('mvUserListCtrl', function ($scope, $http, mvUser) {

    // Get all the users from the resource
    $scope.users = mvUser.query();

    $scope.deleteUser = function (user) {
        // check if he sure want to delete the user
        if (confirm("Are you sure?")) {
            // delete user
            deleteByUser(user);
        }
    };

    $scope.GetTemplatesStatitcs = function () {
        $http({
            url: '/api/Group',
            method: "GET"
        }).
        success(function (data, status) {
            $scope.templates = data;
        }).
        error(function (data, status) {
            console.log('error get template statitics');
        });
    }

    function deleteByUser(UserData) {
        // mvUser remove user
        mvUser.remove({
            id: UserData._id
        });

        // Get the all users
        $scope.users = mvUser.query();

        alert(UserData.firstName + " " + serData.lastName + " Deleted");
    };
});