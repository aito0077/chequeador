'use strict';

angular.module('checkApp.home', ['ngRoute','ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'modules/home/index.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', ['$scope','$http', 'Checkup', function($scope, $http, Checkup) {

    var checkups = Checkup.query(function(data) {
        $scope.checkups = checkups;
    });

}]);
