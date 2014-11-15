angular.module('sourceModule.controllers',['ngRoute'])

.controller('SourceListController', ['$scope', '$routeParams', 'Source', function($scope,$routeParams, $window,Source){

    $scope.sources=Source.query();

    $scope.deleteSource=function(source){
        source.$delete(function(){
            $window.location.href='';
        });
    }

}])

.controller('SourceViewController',['$scope', '$routeParams', 'Source', 'Checkup', function($scope,$routeParams,Source,Checkup){

    $scope.checkup = Checkup.get({id:$routeParams.checkup_id});
    $scope.source = Source.get({id:$routeParams.id});

}])

.controller('SourceCreateController', ['$scope', '$routeParams', 'Source', 'Checkup', 'Entity', function($scope,$routeParams,Source, Checkup, Entity){

    $scope.source = new Source();
    $scope.checkup = Checkup.get({id:$routeParams.checkup_id}, function() {

    var param_type = ($routeParams.type || '').toUpperCase();
        $scope.source_type =  _.contains(['ORI', 'OFI', 'ALT'], param_type) ?  param_type :  'ALT';

        if($scope.source_type === 'ORI') {
            $scope.entity = Entity.get({id: $scope.checkup.quote.author});
        } else {
            $scope.entity = new Entity();
        }
    });

    $scope.addSource=function(){
        $scope.source.$save(function(){

        });
    }

    $scope.types = {
        'ORI': {
            description: 'Original',
            method_order: 3
        },
        'OFI': {
            description: 'Oficial',
            method_order: 4
        },
        'ALT': {
            description: 'Alternartiva',
            method_order: 5
        }
    };

    $scope.sourceTypeObject = function(){
        return $scope.types[$scope.source_type];
    }

}])

.controller('SourceEditController', ['$scope', '$routeParams', 'Source', function($scope,$routeParams,Source){

    $scope.updateSource=function(){
        $scope.source.$update(function(){
        });
    };

    $scope.loadSource=function(){
        $scope.source=Source.get({id:$routeParams.id});
    };

    $scope.loadSource();
}]);
