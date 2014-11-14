/**
 * Created by Sandeep on 01/06/14.
 */
angular.module('sourceModule.controllers',[])

.controller('SourceListController',function($scope,$state,$window,Source){

    $scope.sources=Source.query();

    $scope.deleteSource=function(source){
        source.$delete(function(){
            $window.location.href='';
        });
    }

})

.controller('SourceViewController',function($scope,$stateParams,Source){

    $scope.source=Source.get({id:$stateParams.id});

})

.controller('SourceCreateController',function($scope,$state,$stateParams,Source){

    $scope.source=new Source();

    $scope.addSource=function(){
        $scope.source.$save(function(){
        });
    }

})

.controller('SourceEditController',function($scope,$state,$stateParams,Source){

    $scope.updateSource=function(){
        $scope.source.$update(function(){
        });
    };

    $scope.loadSource=function(){
        $scope.source=Source.get({id:$stateParams.id});
    };

    $scope.loadSource();
});
