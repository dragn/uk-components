'use strict';

(function() {
  var scripts = document.getElementsByTagName("script")
  var currentScriptPath = scripts[scripts.length-1].src;

  var template = '<div class="uk-navbar"><ul class="uk-navbar-nav"><li ng-repeat="item in items" class="{{ ::class(item) }}"><a href="#{{ item.path }}" ng-bind="item.title"></a></li></ul><div ng-transclude></div></div>';
  var templateSmall = '<div class="uk-navbar"><div class="uk-navbar-toggle" data-uk-offcanvas="{target:\'#uk-navbar-offcanvas\'}"></div><div ng-transclude></div></div><div id="uk-navbar-offcanvas" class="uk-offcanvas"><div class="uk-offcanvas-bar"><ul class="uk-nav uk-nav-offcanvas"><li ng-repeat="item in items" class="{{ ::class(item) }}"><a href="#{{ item.path }}" ng-bind="item.title"></a></li></ul></div></div>';
  var mod = angular.module('ukAdaptiveNavbar', []);

  mod.directive('ukAdaptiveNavbar', function() {
    return {
      restrict: 'E',
      scope: {
        items: '=ukItems'
      },
      transclude: true,
      template: function() {
        var isSmall = screen.width && screen.width < 767;
        return isSmall ? templateSmall : template;
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
        $scope.$on('$locationChangeSuccess', handlePath);
        $scope['class'] = function(item) {
          return ($location.path() || '/') == item.path ? 'uk-active': '';
        }
      }]
    };
  });

})();
