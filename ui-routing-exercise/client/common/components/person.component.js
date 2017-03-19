(function() {
'use strict';

    angular
        .module('project')
        .component('person', {
            templateUrl: 'views/person.html',
            bindings: {
                person: '<',
            }
        });
})();