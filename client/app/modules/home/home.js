'use strict';

angular.module('checkApp.home', ['ngRoute','ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'modules/home/index.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', ['$scope','$http', 'Checkup', 'Category', function($scope, $http, Checkup, Category) {

    var checkups = Checkup.query(function(data) {
        $scope.checkups = checkups;
    });

    var categories = Category.query(function(data) {
        $scope.categories = categories;
    });

    $scope.phases = [
        {
            id: 'creation',
            title: 'Creación'
        },
        {
            id: 'sources',
            title: 'Fuentes'
        },
        {
            id: 'context',
            title: 'Contexto'
        },
        {
            id: 'qualification',
            title: 'Calificación'
        }
    ];

    



}]);
