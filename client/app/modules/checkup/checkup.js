'use strict';

angular.module('checkApp.checkupModule', ['ngRoute','ui.router','ngResource', 'checkupModule.controllers'])

.config(['$routeProvider','$stateProvider', function($routeProvider, $stateProvider) {
    $routeProvider.when('/checkup/:id', {
        templateUrl: 'modules/checkup/index.html',
        controller: 'CheckupController'
    });
    $stateProvider
      .state('view', {
        templateUrl: 'modules/checkup/partials/view.html',
        controller: 'CheckupViewController'
      }) 
     .state('quote', {
        templateUrl: 'modules/checkup/partials/quote.html',
        controller: 'CheckupQuoteController'
     })
     .state('source', {
        templateUrl: 'modules/checkup/partials/source.html',
        controller: 'CheckupSourceController'
     })
     .state('context', {
        templateUrl: 'modules/checkup/partials/context.html',
        controller: 'CheckupContextController'
     })
     .state('qualification', {
        templateUrl: 'modules/checkup/partials/qualification.html',
        controller: 'CheckupViewController'
     });

}])
.controller('CheckupController', ['$scope','$http', 'Checkup', 'Category', '$state', function($scope, $http, Checkup, Category, $state) {
    $state.go('view');
}]);

