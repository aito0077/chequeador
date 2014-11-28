angular.module('checkupModule.controllers',['ngRoute', 'ui.router'])

.controller('CheckupViewController',['$scope', '$state', '$routeParams', '$window', 'Checkup', 'Qualification', function($scope, $state, $routeParams, $window, Checkup, Qualification) {

    $scope.phases = [
        {
            id: 'quote',
            code: 'CREACION',
            title: 'Creación',
            text: 'Seleccionar una frase para chequear',
            empty: true,
            active: false,
            icon: '1'
        },
        {
            id: 'source',
            code: 'SOURCES',
            title: 'Fuentes',
            text: 'Consultar fuentes',
            empty: true,
            active: false,
            icon: '2'
        },
        {
            id: 'context',
            code: 'CONTEXT',
            title: 'Contexto',
            text: 'Poner en Contexto',
            empty: true,
            active: false,
            icon: '3'
        },
        {
            id: 'qualification',
            code: 'QUALIFICATION',
            title: 'Calificación',
            text: 'Calificar',
            empty: true,
            active: false,
            icon: '4'
        }
    ];

    $scope.current_phase = $scope.phases[0];

    if($routeParams.id == 'new') {
        $scope.checkup = new Checkup();
    } else {
        $scope.checkup = Checkup.get({
            id: $routeParams.id
        }, function(data) {
            
            _.each($scope.phases, function(phase) {
                if(phase.code == $scope.checkup['phase']) {
                    $scope.current_phase = phase;
                }
                switch(phase.id) {
                    case 'quote':
                        phase['empty'] = !($scope.checkup['quote'] && $scope.checkup['quote'].text != '') ;
                        break;
                    case 'source':
                        phase['empty'] = _.isEmpty($scope.checkup['sources']);
                        break;
                    case 'context':
                        phase['empty'] = _.isEmpty($scope.checkup['contexts']);
                        break;
                    case 'qualification':
                        phase['empty'] = _.isEmpty($scope.checkup['scores']);
                        break;
                };
                phase['active'] = !phase['empty'];
            });


            $scope.maxVoted = _.max(data.scores, function(item){ return item.votes; });

        });
    }


    $scope.isActive = function(phase) {
        return phase.active ? 'bg-active' : '';
    };
    
    $scope.activePhase = function(phase) {
        $scope.current_phase = _.find($scope.phases, function(phase_item) {
            return phase_item.id == phase;
        });
    };

    $scope.add = function(step) {
        if(_.isUndefined($scope.user_id)) {
            $window.location.href = "/#/users/login?url="+ encodeURIComponent("checkup/"+$scope.checkup.id);
            return;
        }

        $state.go(step, {checkup_id: $scope.checkup.id});
    };

    $scope.edit = function(step) {
        if(_.isUndefined($scope.checkup.id) || step == 'quote') {
            return;
        }
        if(_.isUndefined($scope.user_id)) {
            $window.location.href = "/#/users/login?url="+ encodeURIComponent("checkup/"+$scope.checkup.id);
            return;
        }

        $state.go(step, {checkup_id: $scope.checkup.id});
    };

    $scope.isStepDisabled = function(step) {
        return (_.isUndefined($scope.checkup.id) && step != 'quote');
    };

    $scope.itemUrl= function(step) {
        return "modules/checkup/partials/items/"+step+".html";
    };

    $scope.getSourcesByType = function(type) {
        return _.filter($scope.checkup.sources, function(source) {
            return source.type == type;
        });
    };

    $scope.isSourcesTypeEmpty = function(type) {
        return _.isEmpty(_.filter($scope.checkup.sources, function(source) {
                return source.type == type;
        }));
    };

    Qualification.query(function(data) {
        $scope.quality_measures = data;
    });

    $scope.isMaxVoted = function(item) {
        return item.id == $scope.maxVoted.qualification
    };

}])

.controller('CheckupQuoteController',['$scope', 'Checkup', 'Quote', 'Category', '$state', function($scope,Checkup, Quote, Category, $state){

    $scope.checkup = new Checkup();
    $scope.checkup.quote = new Quote();

    var categories = Category.query(function(data) {
        $scope.categories = categories;
    });

    $scope.addCheckup = function(){
        $scope.checkup.$save(function() {

        });
    };

    $scope.isCheckupPersisted = function(){
        return $scope.checkup.id != null;
    };

    $scope.close = function(){
        $state.go('view');
    };

}])

.controller('CheckupSourceController', ['$scope', '$routeParams', '$state', 'Source', 'Checkup', 'Entity', function($scope,$routeParams, $state, Source, Checkup, Entity){

    $scope.current_type = 'ORI';


    $scope.sources = {
        'ORI': new Source(),
        'OFI': [],
        'ALT': []
    };

    $scope.source = new Source();
    $scope.checkup_id = $routeParams.id;
    $scope.sourcePersisted = false;

    $scope.checkup = Checkup.get({
        id: $routeParams.id
    }, function() {
        $scope.sources['ORI'].entity = $scope.checkup.entity;
        $scope.source = $scope.sources['ORI'];
        $scope.source.type = 'ORI';
    });

    $scope.setType = function(type) {
        $scope.current_type = type;
        switch(type) {
            case 'ORI':
                $scope.source = $scope.sources['ORI'];
                break;
            case 'OFI':
                if(_.size($scope.sources['OFI']) == 0) {
                    var new_source = new Source();
                    new_source.type = 'OFI';
                    $scope.sources['OFI'].push(new_source);
                }
                break;
            case 'ALT':
                if(_.size($scope.sources['ALT']) == 0) {
                    var new_source = new Source();
                    new_source.type = 'ALT';
                    $scope.sources['ALT'].push(new_source);
                }
                break;
            default:
                break;
        }
    };   

    $scope.addNewSource = function() {
        var fullValidated = true;
        _.each($scope.sources[$scope.current_type], function(model) {
            model.invalid = (model.entity && model.entity.name && model.what ? false : true);
            fullValidated = fullValidated && !model.invalid;
        });
        if(fullValidated) {
            var new_source = new Source();
            new_source.checkup_id = $scope.checkup.id;
            new_source.type = $scope.current_type;
            new_source.entity = {};
            $scope.sources[$scope.current_type].push(new_source);
        }
    };

    $scope.addSource = function(){
        $scope.message_error = null;

        var sources_to_persist = _.union([$scope.sources['ORI']], $scope.sources['ALT'], $scope.sources['OFI']);
        if(_.size(sources_to_persist) < 2) {
            $scope.message_error = 'para finalizar el paso 2 tenes que consultar al menos 2 fuentes';
            return; 
        }

        _.each(sources_to_persist, function(source) {
            if(_.isUndefined(source.id)) {
                source.checkup_id = $scope.checkup_id;
                source.$save();
            }
        });
        $scope.sourcePersisted = true;
    };

    $scope.entityDescriptionPlaceholder = function() {
        return $scope.current_type == 'ORI' ? 'Qué cargo/rol tiene?' : 'Por qué es relevante?';
    };


}])


.controller('CheckupContextController',['$scope', '$routeParams', '$state', 'Checkup', 'Context', function($scope, $routeParams, $state, Checkup, Context){

    var persisted = false;
    $scope.context = null;

    $scope.contexts = [];

    $scope.checkup = Checkup.get({
        id: $routeParams.id 
    }, function() {
        $scope.contexts = $scope.checkup.full_contexts;        
        if(_.size($scope.contexts) == 0) {
           $scope.context = new Context(); 
        }

    });

    $scope.addContext = function(){
        $scope.context.checkup_id = $scope.checkup.id;
        $scope.context.$save(function(){
            persisted = true;
        });
    }

    $scope.close = function(){
        $state.go('view');
    };

    $scope.isPersisted = function() {
        return persisted;
    };

    $scope.addNewContext = function() {
        $scope.context = new Context();
    };

    $scope.isCreating = function() {
        return $scope.context != null;
    };

}])

.controller('CheckupQualificationController',['$scope', '$routeParams', '$state', '$http', 'Checkup', 'Rate', 'Qualification', 'Score', function($scope, $routeParams, $state, $http, Checkup, Rate, Qualification, Score){

    $scope.hasOwnVote = false;
    $scope.persisted = false;
    $scope.editing = false;

    $scope.qualification = null;

    $scope.votes = {};
    $scope.rate = {};

    $scope.qualify_type = null;
    $scope.selected_score = null;

    $scope.checkup = Checkup.get({
        id: $routeParams.id
    }, function() {
        callVotes($scope.checkup.id, function() {
            $scope.qualification = new Rate(); 
            $scope.editing = !$scope.hasOwnVote;
        });
    });

    var quality_measures = Qualification.query(function(data) {
        $scope.quality_measures = quality_measures;
        $scope.ownRateValues();
    });

    var scores_measures = Score.query(function(data) {
        $scope.scores_measures = scores_measures;
        $scope.ownRateValues();
    });

    $scope.ownRateValues = function() {
        if(_.isEmpty($scope.rate) ) {
            if($scope.hasOwnVote && !_.isEmpty(quality_measures) && !_.isEmpty(scores_measures)) {
                $scope.rate.qualification = _.find(quality_measures, function(item) {
                    return item.id == $scope.votes.own_vote.qualification;
                });
                $scope.rate.score =  _.find(scores_measures, function(item) {
                    return item.id == $scope.votes.own_vote.score;
                });
            }
        }
        return $scope.rate;
    };

    var callVotes = function(checkup_id, callback) {
        $http.get('/api/rates/checkup/'+checkup_id).
        success(function(data, status, headers, config) {
            $scope.votes = data;
            $scope.hasOwnVote = !_.isEmpty(data.own_vote);
            $scope.ownRateValues();
            callback();
        }).error(function(data, status, headers, config) {

        });
    };

    $scope.addQualification = function(){
        $scope.qualification.checkup_id = $scope.checkup.id;
        $scope.qualification.qualification = $scope.qualify_type;
        $scope.qualification.score = $scope.selected_score;
        $scope.qualification.$save(function(){
            $scope.persisted = true;
            $scope.editing = false;
        });
    }

    $scope.close = function(){
        $state.go('view');
    };

    $scope.addNewQualification = function() {
        $scope.qualification = new Rate();
        $scope.editing = true;
    };

    $scope.scoreByType = function(type) {
        return _.filter($scope.scores_measures, function(score) {
            return score.qualification == type;
        });
    };

    $scope.setType = function(type) {
        $scope.qualify_type = type;
        $scope.selected_score = null;
        $scope.rate.qualification = _.find(quality_measures, function(item) {
            return item.id == type;
        });
    };
    
    $scope.setScore = function(score) {
        $scope.selected_score = score;
        $scope.rate.score =  _.find(scores_measures, function(item) {
            return item.id == score;
        });
    };

    $scope.markQualifySelected = function(qualify_item) {
        return (qualify_item == $scope.qualify_type) ? 'selected' : '';
    };

    $scope.markScoreSelected= function(score_item) {
        return (score_item == $scope.selected_score) ? 'selected' : '';
    };
 
    $scope.percentage = function(score_id) {
        if(_.isUndefined(score_id) ||  _.isUndefined($scope.votes) || _.isUndefined($scope.votes.scores) || _.isUndefined($scope.votes.scores[score_id])) {
            return 0;
        }
        return $scope.votes.scores[score_id].percentage; 
    };

    $scope.votesCount = function(score_id) {
        if(_.isUndefined(score_id) ||  _.isUndefined($scope.votes) || _.isUndefined($scope.votes.scores) || _.isUndefined($scope.votes.scores[score_id])) {
            return 0;
        }
        return $scope.votes.scores[score_id].votes; 
    };

}]);


