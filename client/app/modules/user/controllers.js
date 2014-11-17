angular.module('userModule.controllers',['ngRoute'])

.controller('UserListController', ['$scope', '$routeParams', '$http', 'User', function($scope,$routeParams, $http, User){

    $http.get('http://localhost:3000/api/users', {

    }).
    success(function(data, status, headers, config) {
        $scope.users = data;
    }).
    error(function(data, status, headers, config) {
        console.log(data);
    });


}])

.controller('UserViewController',['$scope', '$routeParams', 'User', function($scope,$routeParams,User){


}])

.controller('UserLoginController', ['$scope', '$routeParams', 'User', function($scope,$routeParams,User){


}])


.controller('UserSignupController', ['$scope', '$routeParams', 'User', function($scope,$routeParams,User){


}])

.controller('UserEditController', ['$scope', '$routeParams', 'User', function($scope,$routeParams,User){

    $scope.updateUser=function(){
        $scope.user.$update(function(){
        });
    };

    $scope.loadUser=function(){
        $scope.user = User.get({id:$routeParams.id});
    };

    $scope.loadUser();
}]);
