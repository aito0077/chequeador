'use strict';

angular.module('checkApp.home', ['ngRoute','ui.router','ngResource'])

.config(['$routeProvider', '$stateProvider', function($routeProvider, $stateProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'modules/home/index.html',
    controller: 'HomeController'
  });

 $stateProvider
  .state('list', {
    templateUrl: 'modules/home/partials/grid.html',
    controller: 'checkup-list'
  });


}])
.controller('HomeController', ['$scope','$http', 'Checkup', 'Category', '$state', function($scope, $http, Checkup, Category, $state) {

    console.log($scope.user_id);
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

    $scope.voteUp = function(checkup_id) {
        $http.get('/api/checkup/vote-up/'+checkup_id).
        success(function(data, status, headers, config) {
            console.log('llego');
            var checkups = Checkup.query(function(data) {
                $scope.checkups = checkups;
            });
        }).
        error(function(data, status, headers, config) {
            console.log('err');
        });
    };

    $scope.voteDown = function(checkup_id) {
        $http.get('/api/checkup/vote-down/'+checkup_id).
        success(function(data, status, headers, config) {
            console.log('llego');
            var checkups = Checkup.query(function(data) {
                $scope.checkups = checkups;
            });
        }).
        error(function(data, status, headers, config) {
            console.log('err');
        });
    };

    $scope.getClassByRate = function(rate) {
        if(rate > 0) {
            return 'success';
        }   
        if(rate < 0) {
            return 'danger';
        }   
        return '';
    }
}]);

