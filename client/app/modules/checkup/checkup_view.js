'use strict';

angular.module('checkApp.checkupView', ['ngRoute','ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkup', {
    templateUrl: 'modules/checkup/index.html',
    controller: 'CheckupViewController'
  });
}])

.controller('CheckupViewController', ['$scope','$http', 'Checkup', function($scope, $http, Checkup) {

    var checkup = Checkup.fetch(function(data) {
        $scope.checkups = checkups;
    });

    $('a[title]').tooltip();

}]);
