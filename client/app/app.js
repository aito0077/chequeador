'use strict';

angular.module('checkApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'checkApp.services',
    'checkApp.home',
    'checkApp.userModule',
    'checkApp.checkupModule'
/*
,
    'checkApp.sourceModule',
    'checkApp.contextModule'
*/

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
