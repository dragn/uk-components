'use strict';

(function() {

  var mod = angular.module('ukAutocomplete', []);

  mod.directive('ukAutocomplete', [ '$parse', '$timeout', '$compile', function($parse, $timeout, $compile) {
    return {
      restrict: 'E',
      scope: true,
      link: function(scope, element, attrs) {
        scope.$items = attrs.ukItems ? scope.$items = $parse(attrs.ukItems)(scope) : [];
        scope.$open = false;
        scope.$select = function(val) {
          var value = typeof val == 'string' ? val : val.value;
          scope.$open = false;
          scope.$value   && scope.$parent.$evalAsync(scope.$value + '="' + value + '"');
          attrs.ukSelect && scope.$parent.$evalAsync(attrs.ukSelect, { $item: val });
        };

        // Find input in parent container
        var input = element.parent().find('input');

        // Show dropdown on input's focus
        input.on('focus', function() {
          angular.element(element.find('div')[1]).css('width', input.css('width'));
          scope.$apply('$open = true');
        });

        // Hide dropdown on input's blur
        input.on('blur', scope.$apply.bind(scope, '$open = false'));

        if (input.attr('ng-model')) {
          scope.$value = input.attr('ng-model');
        }

        var itemTemplate = element.html() || '<span ng-bind="item"></span>';
        var template =
          '<div class="uk-position-relative" ' +
          '     ng-class="{ \'uk-open\' : $open && $items.length > 0 }">' +
          '<div class="uk-dropdown uk-dropdown-scrollable">' +
          '  <ul class="uk-nav uk-nav-dropdown">' +
          '    <li ng-repeat="' + (attrs.var || 'item') + ' in $items">' +
          '      <a ng-mousedown="$select(item)">' + itemTemplate + '</a>' +
          '    </li>' +
          '  </ul>' +
          '</div>' +
          '</div>';

        element.html(template);

        $compile(element.contents())(scope);
      }
    }
  }]);

})();
