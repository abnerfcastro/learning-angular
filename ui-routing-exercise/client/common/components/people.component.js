(function() {
'use strict';

    angular
        .module('project')
        .component('people', {
            templateUrl: 'views/people.html',
            bindings: {
                people: '<',
            }
        });
})();