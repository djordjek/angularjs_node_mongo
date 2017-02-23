/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var wafepaApp = angular.module('wafepaApp.mainCtrl', []);



        wafepaApp.controller('MainController', function ($scope, $rootScope, $location, Auth){
           // var vm = this;
            
            var loggedIn = Auth.isLoggedIn();
            
            $rootScope.$on('$rootChangeStart',function (){
                
                $scope.loggedIn = Auth.isLoggedIn();
                Auth.getUser()
                        .then(function (data){
                            $scope.user = data.data;
                })
            });
            
            $scope.doLogin = function (){
                $scope.processing = true;
                
                $scope.error = '';
                
                Auth.login($scope.loginData.username, $scope.loginData.password)
                        .success(function (data){
                            $scope.processing = false;
                    
                    Auth.getUser()
                            .then(function (data){
                                $scope.user = data.data;
                    });
                    
                    if(data.success)
                        $location.path('/');
                    else
                        $scope.error = data.message;
                })
            }
            
            $scope.doLogout = function (){
                Auth.logout();
                $location.path('/logout');
            }
    
})