'use strict';

angular.module('checkApp.checkupModule', ['ngRoute','ngResource', 'checkupModule.controllers'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkups', {
        templateUrl:'modules/checkup/partials/checkups.html',
        controller:'CheckupListController'
    }).
    when('/checkups/:id/view', {
       templateUrl:'modules/checkup/partials/view.html',
       controller:'CheckupViewController'
    }).
    when('/checkups/new', {
        templateUrl:'modules/checkup/partials/add.html',
        controller:'CheckupCreateController'
    }).
    when('checkups/:id/edit', {
        templateUrl:'modules/checkup/partials/edit.html',
        controller:'CheckupEditController'
    });
}]);

