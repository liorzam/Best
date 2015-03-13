angular.module('app').controller('mvScreen', function ($scope, $http, $routeParams) {


    function getScreen() {

        var id = $routeParams.id;
        if (id === 'undefiend') {
            id = "1";
        }
        $http({
            url: '/api/screen/' + id,
            method: "GET"
        }).
        success(function (data, status) {
            $scope.data = data;
        }).
        error(function (data, status) {
            console.log('error get template statitics');
        });
    };

    getScreen();

});