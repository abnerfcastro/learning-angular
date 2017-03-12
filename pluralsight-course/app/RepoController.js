/*
 * Author: Abner Castro
 * Date: July 26th, 2016
 * Description:
 *      Based on Pluralsight course AngularJS: Get Started by Scott Allen.
 *      Creates a module that that will hold a controller called RepoController
 */

(function () {

    var app = angular.module("githubViewer");

    // My controller
    var RepoController = function (
        $scope, github, $routeParams) {

        var onRepo = function(data) {
            $scope.repo = data;
        };

        var onError = function(reason) {
            $scope.error = reason;
        };

        var reponame = $routeParams.reponame;
        var username = $routeParams.username;

        github.getRepoDetails(username, reponame)
              .then(onRepo, onError);

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

    app.controller("RepoController", RepoController);

})();
