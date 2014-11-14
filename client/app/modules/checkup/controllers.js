/**
 * Created by Sandeep on 01/06/14.
 */
angular.module('checkupModule.controllers',[])

.controller('CheckupListController',function($scope,$state,$window,Checkup){

    $scope.checkups=Checkup.query();

    $scope.deleteCheckup=function(checkup){
        checkup.$delete(function(){
            $window.location.href='';
        });
    }

})

.controller('CheckupViewController',function($scope,$stateParams,Checkup){

    $scope.checkup=Checkup.get({id:$stateParams.id});

})

.controller('CheckupCreateController',function($scope,$state,$stateParams,Checkup){

    $scope.checkup=new Checkup();

    $scope.addCheckup=function(){
        $scope.checkup.$save(function(){
        });
    }

})

.controller('CheckupEditController',function($scope,$state,$stateParams,Checkup){

    $scope.updateCheckup=function(){
        $scope.checkup.$update(function(){
        });
    };

    $scope.loadCheckup=function(){
        $scope.checkup=Checkup.get({id:$stateParams.id});
    };

    $scope.loadCheckup();
});
