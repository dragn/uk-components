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
      template: '\
      <div class="uk-navbar">\
      <ul class="uk-navbar-nav">\
      <li ng-repeat="item in items">\
      <a href="#{{ item.path }}" ng-bind="item.title"></a>\
      </li>\
      </ul>\
      </div>',
      controller: [ '$scope', '$element', '$location', function($scope, $element, $location) {
        var path = '', href, el;
        $scope.$on('$locationChangeSuccess', function(event, newUrl) {
          if (path != $location.path()) {
            href = '#' + $location.path();
            angular.forEach($element.find('li'), function(_el) {
              el = angular.element(_el);
              el.toggleClass('uk-active', el.find('a').attr('href') == href);
            });
          }
        });
      } ]
    };
  });

})();
