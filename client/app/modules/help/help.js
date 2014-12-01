'use strict';

angular.module('checkApp.help', [])

.config([function() {

}])
.controller('HelpController', ['$scope','$http', function($scope, $http) {
    console.log('init');
    $scope.testClick = function() {
        console.log('Ckic!');
    };

}]);

