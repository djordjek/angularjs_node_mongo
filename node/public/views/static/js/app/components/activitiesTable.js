(function() {
    'use strict';

    angular
        .module('harness')
        .directive('activitiesTable', function() {
            return {
                restrict: 'E', // moguće vrednosti: 'A' (attribute), 'E' (element), 'C' (class), 'M' (comment)
                templateUrl: 'static/html/activitiesTable.html', // putanja ka fajlu koji sadrži HTML (koristi se ovo ILI template, ne oba)
                scope: {},
                controller: 'ActivityController'
            };
        });



})();