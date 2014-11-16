'use strict';

angular.module('checkApp.sourceModule', ['ngRoute','ngResource', 'sourceModule.controllers'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkups/:checkup_id/sources', {
        templateUrl:'modules/checkup/source/partials/list.html',
        controller:'SourceListController'
    }).
    when('/checkups/:checkup_id/sources/:id/view', {
       templateUrl:'modules/checkup/source/partials/view.html',
       controller:'SourceViewController'
    }).
    when('/checkups/:checkup_id/sources/new', {
        templateUrl:'modules/checkup/source/partials/add.html',
        controller:'SourceCreateController'
    }).
    when('/checkups/:checkup_id/sources/:id/edit', {
        templateUrl:'modules/checkup/source/partials/edit.html',
        controller:'SourceEditController'
    });
}]);

