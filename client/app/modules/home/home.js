'use strict';

angular.module('checkApp.home', ['ngRoute','ui.router','ngResource'])

.config(['$routeProvider', '$stateProvider', function($routeProvider, $stateProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'modules/home/index.html',
    controller: 'HomeController'
  });

 $stateProvider
  .state('test2', {
    templateUrl: 'modules/home/partials/test2.html'
  })
  .state('list', {
    templateUrl: 'modules/home/partials/grid.html',
    controller: 'checkup-list'
  });


}])
.controller('HomeController', ['$scope','$http', 'Checkup', 'Category', '$state', function($scope, $http, Checkup, Category, $state) {

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
    $state.go('list');
}])

.controller('checkup-list', ['$scope','$http', 'Checkup', 'Category', '$state', function($scope, $http, Checkup, Category, $state) {

    var checkups = Checkup.query(function(data) {
        $scope.checkups = checkups;
    });

    var categories = Category.query(function(data) {
        $scope.categories = categories;
    });

}]);

