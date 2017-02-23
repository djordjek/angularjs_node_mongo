/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('appRoutes', ['ngRoute'])

        .config(function ($routeProvider, $locationProvider){
            
            $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html' 
            })
})
