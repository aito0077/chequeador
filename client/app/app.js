'use strict';

angular.module('checkApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'checkApp.services',
    'checkApp.home',
    'checkApp.userModule',
    'checkApp.checkupModule',
    'checkApp.sourceModule',

    'checkApp.view1',
    'checkApp.view2',
    'checkApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
