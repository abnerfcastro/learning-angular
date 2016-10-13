/*
 * Author: Abner Castro
 * Date: July 28th, 2016
 * Description:
 *      Based on Pluralsight course AngularJS: Get Started by Scott Allen.
 *      Creates a service that requests data from Github API.
 */

(function () {
    var github = function($http) {
        
        var getUser = function(username) {
            return $http.get("https://api.github.com/users/" + username)
                        .then(function(response) {
                            return response.data;
                        });
        };

        var getRepos = function(user) {
            return $http.get(user.repos_url)
                        .then(function(response) {
                            return response.data;
                        });
        };

        var getRepoDetails = function(username, reponame) {
            var repo;
            var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
            return $http.get(repoUrl)
                        .then(function(response) {
                            repo = response.data;
                            return $http.get(repoUrl + "/contributors");
                        })
                        .then(function(response) {
                            repo.contributors = response.data;
                            return repo;
                        });
        };
        
        return {
            getUser: getUser,
            getRepos: getRepos,
            getRepoDetails: getRepoDetails
        };    

    };

    var module = angular.module("githubViewer");
    module.factory("github", github);

}());