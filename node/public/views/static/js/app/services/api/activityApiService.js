(function() {
    'use strict';

    angular
        .module('harness')
        .service('activityApiService', activityApiService);

    activityApiService.$inject = ['$http'];

    function userApiService($http) {

        return {
            getActivity: getActivity,
            getActivities: getActivities,
            deleteActivity: deleteActivity,
            saveActivity: saveActivity,
            updateActivity: updateActivity
        };

        function getActivity(id) {
            return $http({
                method: 'GET',
                url: 'api/activities/' + id
            });
        }


        function getActivities(request_params) {
            return $http({
                method: 'GET',
                url: 'api/activities',
                params: {
                    name: request_params.name
                },
            });
        }


        function deleteActivity(id) {
            return $http({
                method: 'DELETE',
                url: 'api/activities/' + id
            });
        }

        function saveActivity(activity) {
            return $http({
                method: 'POST',
                url: 'api/activities',
                //data: activity
                data: {
                    name: activity.name
                }
            });
        }

        function updateActivity(activity) {
            return $http({
                method: 'PUT',
                url: 'api/activities/' + activity._id,
                data: {
                    id: activity._id,
                    name: activity.name
                }
            });
        }

    }
})();