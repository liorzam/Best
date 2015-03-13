angular.module('app').directive('calendar', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(dateText);
                    });
                }
            });
        }
    };
})

angular.module('app').controller('mvOrders', function ($scope, $http, $location) {

    $scope.slectedTemplate = {};
    $scope.slectedscreans = [];
    $scope.slectedDays = [];
    $scope.slectedPics = [];
    $scope.templates = [
        {
            id: 1,
            numberOfMessages: new Array(5),
            messages: []
    },
        {
            id: 2,
            numberOfMessages: new Array(3),
            messages: []
    },
        {
            id: 3,
            numberOfMessages: new Array(8),
            messages: []
    },
        {
            id: 4,
            numberOfMessages: new Array(4),
            messages: []
    },
    ];

    $scope.screens = [
        {
            number: 1,
    },
        {
            number: 2,
    }, {
            number: 3,
    }, {
            number: 4,
    }, {
            number: 5,
    }, {
            number: 6,
    },
    ];

    $scope.days = [
        {
            day: 'Sunday',
            hours: {
                from: '',
                to: ''
            },
            checked: false
    },
        {
            day: 'Monday',
            hours: {
                from: '',
                to: ''
            },
            checked: false
    }, {
            day: 'Tuesday ',
            hours: {
                from: '',
                to: ''
            },
            checked: false
    }, {
            day: 'Wednesday',
            hours: {
                from: '',
                to: ''
            },
            checked: false
    }, {
            day: 'Thursday',
            hours: {
                from: '',
                to: ''
            },
            checked: false
    }, {
            day: 'Friday ',
            hours: {
                from: '',
                to: ''
            },
            checked: false
    },
        {
            day: 'Saturday',
            hours: {
                from: '',
                to: ''
            },
            checked: false
    }
    ];

    $scope.pics = [
        {
            source: '/vendor/images/1.jpg',
            model: 'chk1'
    },
        {
            source: '/vendor/images/2.jpg',
            model: 'chk2'
    },
        {
            source: '/vendor/images/3.jpg',
            model: 'chk3'
    },
        {
            source: '/vendor/app/img/4.jpg',
            model: 'chk4'
    },
        {
            source: '/vendor/images/5.jpg',
            model: 'chk5'
    },
        {
            source: '/vendor/images/6.jpg',
            model: 'chk6'
    },
        {
            source: '/vendor/images/7.jpg',
            model: 'chk7'
    },
        {
            source: '/vendor/images/8.jpg',
            model: 'chk8'
    },
        {
            source: '/vendor/images/9.jpg',
            model: 'chk9'
    }
    ];

    $scope.datepickerOptions = {
        format: 'yyyy-mm-dd',
        language: 'eng',
        startDate: "2014-01-01",
        endDate: "2014-12-29",
        autoclose: true,
    }

    $scope.toggleScreenSelection = function toggleScreenSelection(screenNum) {
        var idx = $scope.slectedscreans.indexOf(screenNum);

        // is currently selected
        if (idx > -1) {
            $scope.slectedscreans.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.slectedscreans.push(screenNum);
        }
    }

    $scope.togglePicsSelection = function togglePicsSelection(image) {
        var idx = $scope.slectedPics.indexOf(image);

        // is currently selected
        if (idx > -1) {
            $scope.slectedPics.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.slectedPics.push(image);
        }
    }


    $scope.toggleDaysSelection = function toggleDaysSelection(dayIndex, day) {
        var idx = $scope.slectedDays.indexOf(day);

        // is currently selected
        if (idx > -1) {
            $scope.slectedDays.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.slectedDays.push(day);
        }
        $scope.days[dayIndex].checked = !$scope.days[dayIndex].checked;
        //$scope.$apply();
    }


    $scope.submitNewMessage = function () {
        var mewMeess = {
            screen: $scope.slectedscreans,
            message: $scope.slectedTemplate.messages,
            image: $scope.slectedPics,
            template: $scope.slectedTemplate.id,
            date: [$scope.dateStart, $scope.dateEnd, $scope.slectedDays /*contaign hours inside*/ ]
        };

        $http.post('/api/message', mewMeess).success(function (response) {
            alert('The Message Saved');
            $location.path('/');
            
            if (response.data.success) {

            } else {

            }
        });
    }


});