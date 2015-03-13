angular.module('app').controller('mvScreen', function ($scope, $http, $routeParams) {

 var messages =[];
    $scope.relevantMessage = {};
    var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";


    function getData() {

        var id = $routeParams.id;
        if (id === 'undefiend') {
            id = "1";
        }
        $http({
            url: '/api/screen/' + id,
            method: "GET"
        }).success(function (data, status) {

            messages.length = 0;
            for (var i = 0; i < data.length; i++) {
                messages.push(data[i]);

                if(FilterRelevantMessages(data[i]))
                {
                    $scope.relevantMessage = data[i];
                    break;
                }
            }

            if($scope.relevantMessage === 'undefined')
            {
                setTimeout(function () {

                    getData();
                }, 15000);
            }

        });

    };

    getData();


    function CheckDateRange(fromDate, toDate) {
        var firstValue = fromDate.split('-');
        var secondValue = toDate.split('-');

        var firstDate = new Date();
        firstDate.setFullYear(firstValue[2], (firstValue[1] - 1), firstValue[1]);

        var secondDate = new Date();
        secondDate.setFullYear(secondValue[2], (secondValue[1] - 1), secondValue[1]);

        if (new Date() >= firstDate && new Date() <= secondDate) {
            return true;
        }

        return false;
    }

    function CheckDay(days) {

        for (var i = 0; i < days.length; i++) {
            if (weekday[new Date().getDay()] === days[i])
                return true;
        }
        return false;
    }

    function CheckHours(start, end) {
        var startHour = parseInt(start.split(':')[0]);
        var startMin = parseInt(start.split(':')[1]);

        var endHour = parseInt(end.split(':')[0]);
        var endMin = parseInt(end.split(':')[1]);


        var currentHour = new Date().getHours();
        var currentMin = new Date().getMinutes();


        if (currentHour >= startHour &&
            currentHour <= endHour) {

            if (currentHour == endHour)
                return currentMin <= endMin;
            else
                return true;

        }
        return false;
    };


    function FilterRelevantMessages(message) {
    //Run Over all the Dates

        var IsRelevant = true;
        for (var j = 0; j < message.date.length; j++) {
            //range
            IsRelevant &= CheckDateRange(message.date[j]["range"].fromDate, message.date[j]["range"].toDate);

            //days
            IsRelevant |= CheckDay(message.date[j]["days"]);

            //hours
            for (var i = 0; i < message.date[j].days.length; i++) {
                IsRelevant |= CheckHours(message.date[j].days[i].hours.fromHours, message.date[j].days[i].hours.toHours);
            };
            
        }

        return IsRelevant;
    };

    function TakeNext(PrevMsgIndex) {

        if (relevantMessages.length == 0) {
            setTimeout(function () {
                // Update the relevant messages

                relevantMessages = jQuery.grep(messages, FilterRelevantMessages);
                selectedMessage = null;
                TakeNext(-2);
            }, 5000);
        } else {
            var Index = relevantMessages.indexOf(selectedMessage);

            if (Index !== 'undefined' &&
                Index == PrevMsgIndex &&
                Index + 1 <= relevantMessages.length) {
                selectedMessage = relevantMessages[Index + 1];
            } 
            else {
                selectedMessage = relevantMessages[0];
            }

        Execute();
        }
    };


    function Execute() {
        if ($scope.relevantMessage != null && $scope.relevantMessage !== 'undefined') {
            // Puts the template on the main content

            setTimeout(function () {


                var selectedIndexMsg = messages.indexOf($scope.relevantMessage);

                    TakeNext(selectedIndexMsg);
                }, messages.displayTimeout);

        }
    };

});


