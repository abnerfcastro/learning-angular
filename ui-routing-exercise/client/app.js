/*!
 * client/app.js
 * 
 * Copyright(c) 2017 @project-name
 * Author: @author
 * Date: @date
 */

(function() {
    'use strict';

    angular.module('project', [
        'ui.router',
        'ui.router.visualizer'
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('hello', {
                url: '/hello',
                template: '<h3>Hello World!</h3>'
            })
            .state('about', {
                url: '/about',
                template: '<h3>It is the UI-Router Hello World app!</h3>'
            })
            .state('people', {
                url: '/people',
                component: 'people',
                resolve: {
                    people: function(PeopleService) {
                        return PeopleService.getAllPeople();
                    }
                }
            })
            .state('person', {
                name: 'person',
                url: 'people/{personID}',
                component: 'person',
                resolve: {
                    person: function(PeopleService, $transition$) {
                        return PeopleService.getPerson($transition$.params().personId);
                    }
                }
            });
    })
    .run(function($http) {
        $http.get('data/people.json', {cache: true});
    });    

})();