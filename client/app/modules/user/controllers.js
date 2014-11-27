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


.controller('UserLoginController', ['$scope', '$routeParams', 'User', function($scope,$routeParams,User){
    $scope.back_url = encodeURIComponent($routeParams.url);
}])

.controller('UserProfileController', ['$scope', '$routeParams', '$stateParams', 'User', function($scope,$routeParams, $stateParams,User ){
    console.log('User id: '+$routeParams.id);
    console.log('State User id: '+$stateParams.user_id);

    var user_profile = User.get({
        id: $routeParams.id
    }, function(data) {
        $scope.profile = user_profile;
    });

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
