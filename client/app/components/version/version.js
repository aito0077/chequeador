'use strict';

angular.module('checkApp.version', [
  'checkApp.version.interpolate-filter',
  'checkApp.version.version-directive'
])

.value('version', '0.2');
