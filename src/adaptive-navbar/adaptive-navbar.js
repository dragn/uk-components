'use strict';

(function() {

  var mod = angular.module('ukAdaptiveNavbar', []);

  mod.directive('ukAdaptiveNavbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'src/adaptive-navbar/adaptive-navbar.html'
    };
  });

})();
