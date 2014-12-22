'use strict';

(function() {
  
  var mod = angular.module('ukAutocomplete', []);

  mod.directive('ukAutocomplete', [ '$parse', '$timeout', '$compile', function($parse, $timeout, $compile) {
    return {
      restrict: 'E',
      scope: true,
      link: function(scope, element, attrs) {
        var itemTemplate = element.html() || '{{ item }}',
            valueExpr = attrs.ngModel ? '$parent.' + attrs.ngModel : '$value',
            template = 
          '<div class="uk-position-relative" ' +
          '     ng-class="{ \'uk-open\' : $open && $items.length > 0 }">' +
          '<input type="text" ng-focus="$open=true" ng-blur="$open=false" ng-model="' + valueExpr + '" ng-change="$change()">' +
          '<div class="uk-dropdown uk-dropdown-scrollable">' +
          '  <ul class="uk-nav uk-nav-dropdown">' +
          '    <li ng-repeat="' + (attrs.var || 'item') + ' in $items">' +
          '      <a ng-mousedown="$select(item)">' + itemTemplate + '</a>' +
          '    </li>' +
          '  </ul>' +
          '</div>';
        element.html(template);
        scope.$items = attrs.ukItems ? scope.$items = $parse(attrs.ukItems)(scope) : [];
        scope.$open = false;
        scope.$select = function(val) {
          var value = typeof val == 'string' ? val : val.value;
          scope.$eval(valueExpr + '="' + value + '"');
          if (attrs.ukSelect) {
            scope.$parent.$eval(attrs.ukSelect, { $item: val });
          }
        };
        scope.$change = function() {
          // TODO
        };
        $compile(element.contents())(scope);
      }
    }
  }]);

})();
