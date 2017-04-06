(function () {
    'use strict'
    angular.module('app.core', [])
        .constant('BASE_API_URL', 'https://jsonplaceholder.typicode.com/todos')
        .constant('LOCAL_JSON_URL', 'data.json')
        .factory('DataProvider', function ($http, $q, $log, BASE_API_URL, LOCAL_JSON_URL) {
            var service = {
                fromApi: getRemote,
                fromLocal: getLocal
            };

            var cacheLocalJson = null;

            function makeRequest(urlPath) {
                return $http({
                    'url': urlPath,
                    'method': 'GET',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    // If this were enabled, there would be no need for cacheLocalJson
                    // Refreshing API call would also be instantaneous
                    // 'cache': true
                }).then(function (response) {
                    $log.debug('REQUEST CALL', response.data);
                    return response.data;
                }).catch(dataProviderError);
            };

            function getRemoteJSON() {
                return makeRequest(BASE_API_URL);
            }

            function getLocalJSON() {
                return makeRequest(LOCAL_JSON_URL);
            };

            function getRemote() {
                return getRemoteJSON()
                    .then(function (data) {
                        $log.debug('REMOTE RESPONSE', data);
                        return data;
                    });
            }

            function getLocal() {
                var deferred = $q.defer();
                if (cacheLocalJson) {
                    $log.debug('FROM CACHE');
                    deferred.resolve(cacheLocalJson);
                } else {
                    getLocalJSON()
                        .then(function(data) {
                            $log.debug('LOCAL JSON RESPONSE', data);
                            cacheLocalJson = data;
                            deferred.resolve(data);
                        }, function(error) {
                            deferred.reject;
                        });
                }

                return deferred.promise;
            }

            return service;

            function dataProviderError(error) {
                $log.debug('REQUEST FAILED', error);                
                return error;
            }
        })
        .controller('TaskListCtrl', ['$scope', '$log', 'DataProvider', function ($scope, $log, DataProvider) {
            var ctrl = this;
            ctrl.todos = [];
            ctrl.loading = true;
            ctrl.getLocalTodos = function () {
                ctrl.loading = true;
                clean();
                DataProvider.fromLocal()
                    .then(function (result) {
                        $log.log('Successful local JSON call.');
                        $log.debug('RESPONSE', result);
                        ctrl.todos = (result !== 'null') ? result : {};
                    }, function (reason) {
                        $log.debug('REASON', reason);
                    })
                    .finally(function() {
                        ctrl.loading = false;
                    });
            };

            ctrl.getApiTodos = function() {
                ctrl.loading = true;
                clean();
                DataProvider.fromApi()
                    .then(function (result) {
                        $log.log('Successful API call.');
                        $log.debug('RESPONSE', result);
                        ctrl.todos = (result !== 'null') ? result : {};
                    }, function (reason) {
                        $log.debug('REASON', reason);
                    })
                    .finally(function() {
                        ctrl.loading = false;
                    });
            }

            function clean() {
                ctrl.todos = [];
            }            

            function activate() {
                ctrl.getLocalTodos();
            }

            activate();

        }])

})();