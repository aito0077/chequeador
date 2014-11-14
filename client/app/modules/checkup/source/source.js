'use strict';

angular.module('checkApp.sourceModule', ['ngRoute','ngResource', 'sourceModule.controllers'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sources', {
        templateUrl:'modules/checkup/source/partials/sources.html',
        controller:'SourceListController'
    }).
    when('/sources/:id/view', {
       templateUrl:'modules/checkup/source/partials/view.html',
       controller:'SourceViewController'
    }).
    when('/sources/new', {
         templateUrl:'modules/checkup/source/partials/add.html',
        controller:'SourceCreateController'
    }).
    when('sources/:id/edit', {
        templateUrl:'modules/checkup/source/partials/edit.html',
        controller:'SourceEditController'
    });
}]);

