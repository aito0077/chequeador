'use strict';

angular.module('checkApp.userModule', ['ngRoute','ngResource', 'userModule.controllers'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users/login', {
        templateUrl:'modules/user/partials/login.html',
        controller:'UserLoginController'
    }).
    when('/users/signup', {
        templateUrl:'modules/user/partials/signup.html',
        controller:'UserSignupController'
    });
}]);

