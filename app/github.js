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
        
        return {
            getUser: getUser,
            getRepos: getRepos
        };    

    };

    var module = angular.module("githubViewer");
    module.factory("github", github);

}());