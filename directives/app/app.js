/*!
 * app/app.js
 * 
 * 
 * Author: Abner Castro
 * Date: May 31th, 2017
 */

(function () {
    'use strict';

    angular.module('app.core', []);

    angular.module('app.core')
        .controller('SillyCustomerCtrl', ['$scope', function ($scope) {
            $scope.customer = {
                name: 'David',
                street: '1234 Anywhere St.'
            }
        }])
        .directive('sillyCustomerShared', function () {
            // This directive inherits the scope from the view by default
            // This is referred to as shared scope; use it when you know a lot about the parent scope
            return {
                template: '{{customer.name}} lives on {{customer.street}}. I know this because I share scope with the parent view.',
                // by simply adding this, we would isolate the scope
                // scope: {}
            }
        })
        .directive('myDomDirective', function () {
            // Simple directive that allows DOM manipulation through the link function
            return {
                link: function (scope, element, attrs) {
                    // the elem parameter is wrapped in jQuery, so no need for $('domObject')
                    element.bind('click', function () {
                        element.html('Yaaaaay, you clicked me! :)');
                    });
                    element.bind('mouseenter', function () {
                        element.css('background-color', 'yellow');
                    });
                    element.bind('mouseleave', function () {
                        element.css('background-color', 'white');
                    })
                }
            }
        })

        // creating directives with isolated scope
        .directive('sillyCustomerIsolated', function () {
            return {
                template: '{{name}} is a customer. I do not know where he lives because that information has not been shared with me...',
                scope: {
                    // @ one-way binding
                    // = two-way binding
                    name: '@'
                }				
            }
        })

        .controller('BindingDemoCtrl', ['$scope', '$log', function ($scope, $log) {
            $scope.message = 'Hi';
            $scope.counter = '0';

            $scope.changeMessage = function () {
                $scope.message = ($scope.message === 'Hi') ? 'Hello' : 'Hi';
            }

            $scope.increment = function () {
                $scope.counter++;
            }

            $scope.reset = function () {
                $log.log('user clicked on reset!');
                $scope.message = 'Hi';
                $scope.counter = 0;
            }

        }])
        .directive('bindingDemoIsolatedDirective', function () {
            return {
                scope: {
                    message: '@',
                    counter: '=',
                    action: '&'
                },
                templateUrl: 'views/bindingDemo.view.html'
            }
        })

        // external functions and directives
        .controller('LogMessageCtrl', ['$scope','$log', function ($scope, $log) {
                        
        }])

})();