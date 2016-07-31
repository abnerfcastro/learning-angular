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
    var MainController = function ($scope, $http) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
        }

        var onError = function (reason) {
            $scope.error = "Could not fetch the user!";
        }

        $http.get("https://api.github.com/users/abnerfcastro")
            .then(onUserComplete, onError);

        $scope.message = "Hello, Angular!";
    }

    app.controller("MainController", ["$scope", "$http", MainController]);

})();
