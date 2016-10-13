/*
 * Author: Abner Castro
 * Date: July 26th, 2016
 * Description:
 *      Based on Pluralsight course AngularJS: Get Started by Scott Allen.
 *      Creates a module that that will hold a controller called MainController
 */

(function () {

    var app = angular.module("githubViewer");

    // My controller
    var MainController = function ($scope, $interval, $location) {

        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        }

        var countdownInterval = null;
        var startCountdown = function () {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        }

        $scope.search = function (username) {
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
            $location.path("/user/" + username);
        };

        $scope.username = "angular";
        $scope.countdown = 5;

        startCountdown();
    }

    //app.controller("MainController", ["$scope", "$http", "$interval", "$log", MainController]);

    // Can also call it like this
    app.controller("MainController", MainController);

})();
