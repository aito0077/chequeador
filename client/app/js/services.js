angular.module('checkApp.services',['ngResource']).
    factory('User',['$resource', function($resource){
        return $resource('http://localhost:3000/api/users/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Checkup',['$resource', function($resource){
        return $resource('http://localhost:3000/api/checkups/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Quote',['$resource', function($resource){
        return $resource('http://localhost:3000/api/quotes/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Source',['$resource', function($resource){
        return $resource('http://localhost:3000/api/sources/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Context',['$resource', function($resource){
        return $resource('http://localhost:3000/api/contexts/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Qualification',['$resource', function($resource){
        return $resource('http://localhost:3000/api/qualifications/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Entity',['$resource', function($resource){
        return $resource('http://localhost:3000/api/entities/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('Category',['$resource', function($resource){
        return $resource('http://localhost:3000/api/categories/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('SourceType',['$resource', function($resource){
        return $resource('http://localhost:3000/api/source-types/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]).
    factory('EntityType',['$resource', function($resource){
        return $resource('http://localhost:3000/api/entity-types/:id', { id:'@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
;
