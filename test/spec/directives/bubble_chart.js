'use strict';

describe('Directive: bubbleChart', function () {

  // load the directive's module
  beforeEach(module('tarjetasOpacasApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bubble-chart></bubble-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bubbleChart directive');
  }));
});
