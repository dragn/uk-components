'use strict';

(function() {
  var scripts = document.getElementsByTagName("script")
  var currentScriptPath = scripts[scripts.length-1].src;

  var mod = angular.module('ukAdaptiveNavbar', []);

  mod.directive('ukAdaptiveNavbar', function() {
    return {
      restrict: 'E',
      scope: {
        items: '=ukItems'
      },
      transclude: true,
      templateUrl: function() {
        var isSmall = screen.width && screen.width < 767;
        // todo: do something with the url
        var base = 'uk-components/src/adaptive-navbar/';
        return base + (isSmall ? 'adaptive-navbar-small.html' : 'adaptive-navbar.html');
      },
      controller: ['$scope', '$element', '$location', function($scope, $element, $location) {
        var path = '', href, el;
        function handlePath() {
          if (path != $location.path()) {
            href = '#' + $location.path();
            angular.forEach($element.find('li'), function(_el) {
              el = angular.element(_el);
              el.toggleClass('uk-active', el.find('a').attr('href') == href);
            });
          }
        };
        handlePath();
        $scope.$on('$locationChangeSuccess', handlePath);
        $scope['class'] = function(item) {
          return $location.path() == item.path ? 'uk-active': '';
        }
      }]
    };
  });

})();
