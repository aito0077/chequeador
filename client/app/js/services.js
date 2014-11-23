angular.module('checkApp.services',['ngResource']).
    factory('User',['$resource', function($resource){
        return $resource('http://coperable.dev/api/users/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Checkup',['$resource', function($resource){
        return $resource('http://coperable.dev/api/checkups/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Quote',['$resource', function($resource){
        return $resource('http://coperable.dev/api/quotes/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Source',['$resource', function($resource){
        return $resource('http://coperable.dev/api/sources/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Context',['$resource', function($resource){
        return $resource('http://coperable.dev/api/contexts/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Rate',['$resource', function($resource){
        return $resource('http://coperable.dev/api/rates/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Score',['$resource', function($resource){
        return $resource('http://coperable.dev/api/scores/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Qualification',['$resource', function($resource){
        return $resource('http://coperable.dev/api/qualifications/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Entity',['$resource', function($resource){
        return $resource('http://coperable.dev/api/entities/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Category',['$resource', function($resource){
        return $resource('http://coperable.dev/api/categories/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('SourceType',['$resource', function($resource){
        return $resource('http://coperable.dev/api/source-types/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('EntityType',['$resource', function($resource){
        return $resource('http://coperable.dev/api/entity-types/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
;
