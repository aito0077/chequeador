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

    $scope.checkup=Checkup.get({id:1});

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
