'use strict';

angular.module('checkApp', [
    'ngRoute',
    'ngResource',
    'ui.router',
    'checkApp.services',
    'checkApp.home',
    'checkApp.help',
    'checkApp.userModule',
    'checkApp.checkupModule'

]).
config(['$routeProvider', function($routeProvider) {
  
    $routeProvider.otherwise({redirectTo: '/home'});
}])
.directive('ngReallyClick', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    }
}])
.run(function($rootScope, $window) {

    $rootScope.user_id = $window.user_id;
});
