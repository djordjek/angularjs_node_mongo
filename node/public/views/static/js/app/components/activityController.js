(function() {
    'use strict';

    angular
        .module('harness')
        .controller('ActivityController', ActivityController);

    ActivityController.$inject = ['$scope', '$location', '$routeParams', 'activityApiService'];

    function ActivityController($scope, $location, $routeParams, activityRestService) {


        function getActivities() {
            var request_params = {};
            if ($scope.search) {
                request_params['name'] = $scope.search;
            }

            //request_params['page'] = $scope.page;

            activityApiService.getActivities(request_params).then(onSuccess, onError);

            function onSuccess(response) {

                $scope.activities = response.data;;
                $scope.successMessage = 'Everything OK';
            }

            function onError(response) {
                $scope.errorMessage = 'Oops, something went wrong.';
            }

        }
    }
})();