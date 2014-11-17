angular.module('checkupModule.controllers',['ngRoute', 'sourceModule.controllers', 'contextModule.controllers'])

.controller('CheckupListController',function($scope,$window,Checkup){

    $scope.checkups = Checkup.query();

    $scope.deleteCheckup = function(checkup){
        checkup.$delete(function(){
            $window.location.href='';
        });
    }

})

.controller('CheckupCreateController',['$scope', 'Checkup', 'Quote', 'Category', '$window', function($scope,Checkup, Quote, Category, $window){

    $scope.checkup = new Checkup();
    $scope.checkup.quote = new Quote();

    var categories = Category.query(function(data) {
        $scope.categories = categories;
    });


    $scope.addCheckup = function(){
        $scope.checkup.$save(function() {
            $window.location.href='/#/checkups/'+$scope.checkup.id+'/view';
        });
    }

}])

.controller('CheckupViewController',['$scope', '$routeParams', 'Checkup', function($scope, $routeParams, Checkup) {

    $scope.checkup = Checkup.get({
        id: $routeParams.id
    });

    $scope.phases = [
        {
            id: 'creation',
            title: 'Creación',
            order: 'one',
            icon: 'exclamation-sign'
        },
        {
            id: 'sources',
            title: 'Fuentes',
            order: 'two',
            icon: 'question-sign'
        },
        {
            id: 'context',
            title: 'Contexto',
            order: 'three',
            icon: 'info-sign'
        },
        {
            id: 'qualification',
            title: 'Calificación',
            order: 'four',
            icon: 'ok-sign'
        }
    ];

    $scope.current_phase = $scope.phases[0];
    
    $scope.activePhase = function(phase) {
        $scope.current_phase = _.find($scope.phases, function(phase_item) {
            return phase_item.id == phase;
        });
    };

}])


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
