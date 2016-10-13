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
    var UserController = function (
        $scope, github, $routeParams) {

        var onUserComplete = function (data) {
            $scope.user = data;
            github.getRepos($scope.user)
                .then(onRepos, onError);
        };

        var onRepos = function (data) {
            $scope.repos = data;
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data.";
        };

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";
        github.getUser($scope.username).then(onUserComplete, onError)
    }

    //app.controller("MainController", ["$scope", "$http", "$interval", "$log", MainController]);

    // Can also call it like this
    app.controller("UserController", UserController);

})();
