'use strict';

describe('checkApp.version module', function() {
  beforeEach(module('checkApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
