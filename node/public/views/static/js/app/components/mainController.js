(function() {
    'use strict';

    angular
        .module('harness')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$location', '$rootScope'];

    function MainController($scope, $rootScope, $location) {

        /*var loggedIn = Auth.isLoggedIn();

        $rootScope.$on('$rootChangeStart', function() {

            $scope.loggedIn = Auth.isLoggedIn();
            Auth.getUser()
                .then(function(data) {
                    $scope.user = data.data;
                })
        });


        function doLogin() {
            $scope.processing = true;

            $scope.error = '';

            Auth.login($scope.loginData.username, $scope.loginData.password)
                .success(function(data) {
                    $scope.processing = false;

                    Auth.getUser()
                        .then(function(data) {
                            $scope.user = data.data;
                        });

                    if (data.success)
                        $location.path('/');
                    else
                        $scope.error = data.message;
                })
        }*/


    }
})();