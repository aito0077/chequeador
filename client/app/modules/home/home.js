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

    var collaborators = {};
    var own_votes = {};

    $http.get('/api/checkup/collaborators').
    success(function(data, status, headers, config) {
        collaborators = data.collaborators;
        own_votes = data.own_votes;
    }).error(function(data, status, headers, config) {

    });

    var categories = Category.query(function(data) {
        $scope.categories = categories;
    });

    $scope.voteUp = function(checkup_id) {
        if($scope.hasVote(checkup_id)) {
            return;
        }
        $http.get('/api/checkup/vote-up/'+checkup_id).
        success(function(data, status, headers, config) {
            var checkups = Checkup.query(function(data) {
                $scope.checkups = checkups;
            });
        }).
        error(function(data, status, headers, config) {
        });
    };

    $scope.voteDown = function(checkup_id) {
        if($scope.hasVote(checkup_id)) {
            return;
        }
        $http.get('/api/checkup/vote-down/'+checkup_id).
        success(function(data, status, headers, config) {
            var checkups = Checkup.query(function(data) {
                $scope.checkups = checkups;
            });
        }).
        error(function(data, status, headers, config) {
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
    };

    $scope.getCollaborators = function(checkup_id) {
        return  collaborators[checkup_id] || [];
    };

    $scope.hasVote = function(checkup_id) {
        var voted = own_votes[checkup_id],
            up = true;
        if(!voted) return false;
        up = (voted == 1 ? true : false);

        return  {
            class: 'voted-' + (up ? 'up' : 'down'),
            up: up
        }; 
    };

}]);

