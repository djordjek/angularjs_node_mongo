(function() {
    'use strict';

    angular
        .module('harness')
        .controller('ActivityController', ActivityController);

    ActivityController.$inject = ['$scope', '$location', '$routeParams', 'activityApiService'];

    function ActivityController($scope, $location, $routeParams, activityApiService) {

        $scope.getActivities = getActivities;
        $scope.deleteActivity = deleteActivity;
        $scope.initActivity = initActivity;
        $scope.saveActivity = saveActivity;


        function getActivities() {
            var request_params = {};
            if ($scope.search) {
                request_params['name'] = $scope.search;
            }

            //request_params['page'] = $scope.page;

            activityApiService.getActivities(request_params).then(onSuccess, onError);

            function onSuccess(response) {

                $scope.activities = response.data;
                $scope.successMessage = 'Everything OK';
            }

            function onError(response) {
                $scope.errorMessage = 'Oops, something went wrong.';
            }

        }

        function deleteActivity(id, index) {
            activityApiService.deleteActivity(id).then(onSuccess, onError);

            function onSuccess(response) {
                $scope.activities.splice(index, 1);
            }

            function onError(response) {
                $scope.errorMessage = 'Oops, something went wrong.';
            }
        }

        function initActivity() {
            $scope.activity = {};

            if ($routeParams && $routeParams.id) {
                activityApiService.getActivity($routeParams.id).then(onSuccess, onError);

                function onSuccess(response) {
                    $scope.activity = data;
                }

                function onError(response) {
                    $scope.errorMessage = 'Oops, something went wrong.';
                }

            }
        }

        function saveActivity() {
            activityApiService.saveActivity($scope.activity)
                .success(function() {
                    $location.path('/activities');
                })
                .error(function() {

                });
        }


    }
})();