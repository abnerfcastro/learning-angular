/*
 * Author: Abner Castro
 * Date: July 26th, 2016
 * Description:
 *      Based on Pluralsight course AngularJS: Get Started by Scott Allen.
 *      Creates a module that that will hold a controller called MainController
 */

(function () {

    var app = angular.module("githubViewer", []);

    // My controller
    var MainController = function (
        $scope, $http, $interval, $log, $anchorScroll, $location) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function (response) {
            $scope.repos = response.data;
            $location.hash("userDetails");
            $anchorScroll();
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data.";
        };

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

        $scope.search = function () {
            $log.info("Searching for " + $scope.username);
            $http.get("https://api.github.com/users/" + $scope.username)
                .then(onUserComplete, onError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

        $scope.username = "angular"
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 5;

        startCountdown();
    }

    //app.controller("MainController", ["$scope", "$http", "$interval", "$log", MainController]);

    // Can also call it like this
    app.controller("MainController", MainController);

})();
