describe 'ukAutocomplete module', ->
  
  beforeEach -> module 'ukAutocomplete'

  $rootScope  = {}
  $compile    = {}
  $timeout   = {}

  beforeEach inject (_$rootScope_, _$compile_, _$timeout_) ->
    $rootScope = _$rootScope_
    $compile = _$compile_
    $timeout = _$timeout_

  it 'should process tag <uk-autocomplete> and add input element', ->
    el = $compile('<uk-autocomplete></uk-autocomplete>') $rootScope
    $rootScope.$digest()
    expect(el.find('input').length).toBe 1

  it 'should support ng-model attribute', ->
    scope = $rootScope.$new()
    scope.value = 'some-value'
    el = $compile('<uk-autocomplete ng-model="value"></uk-autocomplete>') scope
    scope.$digest()
    expect(el.find('input').length).toBe 1
    input = el.find('input')
    expect(input.val()).toBe 'some-value'
    input.val 'other-value'
    input.triggerHandler 'input'
    expect(scope.value).toBe 'other-value'

  it 'should show items on focus (no template, String items)', ->
    scope = $rootScope.$new()
    scope.items = [ 'item1', 'item2', 'item3' ]
    el = $compile('<uk-autocomplete uk-items="items"></uk-autocomplete>') scope
    scope.$digest()

    # Items should be rendered
    expect(el.find('li').length).toBe 3
    expect(el.html()).toContain 'item1'
    expect(el.html()).toContain 'item2'
    expect(el.html()).toContain 'item3'

    # Dropdown should be hidden
    expect(el.children('div').hasClass('uk-open')).toBe false

    # Dropdown should appear on focus
    el.find('input').triggerHandler 'focus'
    expect(el.children('div').hasClass('uk-open')).toBe true

    # .. and hide on blur
    el.find('input').triggerHandler 'blur'
    $timeout.flush(100)

    expect(el.children('div').hasClass('uk-open')).toBe false

  it 'should set value from list upon click', ->
    scope = $rootScope.$new()
    scope.items = [ 'item1', 'item2', 'item3' ]
    scope.val = 'initial'
    el = $compile('<uk-autocomplete ng-model="val" uk-items="items"></uk-autocomplete>') scope
    scope.$digest()

    # Focus an input, dropdown should appear
    el.find('input').triggerHandler 'focus'
    expect(el.children('div').hasClass('uk-open')).toBe true

    # Select second item, value should change and dropdown should disappear
    angular.element(el.find('li')[1]).children('a').triggerHandler 'mousedown'
    expect(scope.val).toBe 'item2'
    expect(el.children('div').hasClass('uk-open')).toBe false

  it 'should support values as objects and templates', ->
    scope = $rootScope.$new()
    scope.items = [
       label: 'Item 1 Label'
       value: 'item1'
      ,
       label: 'Item 2 Label'
       value: 'item2'
      ,
       label: 'Item 3 Label'
       value: 'item3'
    ]
    scope.value = 'initial'
    el = $compile('<uk-autocomplete ng-model="value" uk-items="items">Label: {{ item.label }}, value = {{ item.value }}</uk-autocomplete>') scope
    scope.$digest()

    # Check that items are rendered by template
    expect(el.html()).toContain('Label: Item 1 Label, value = item1')
    expect(el.html()).toContain('Label: Item 2 Label, value = item2')
    expect(el.html()).toContain('Label: Item 3 Label, value = item3')

    # Select second value, model and input's value should change accordingly
    angular.element(el.find('li')[1]).children('a').triggerHandler 'mousedown'
    expect(scope.value).toBe 'item2'
    expect(el.find('input').val()).toBe 'item2'

  it 'should call listener specified by uk-select', ->
    scope = $rootScope.$new()
    scope.items = [
       label: 'Item 1 Label'
       value: 'item1'
      ,
       label: 'Item 2 Label'
       value: 'item2'
    ]
    selected = {}
    scope.value = 'initial'
    scope.select = (item) -> selected = item

    el = $compile('<uk-autocomplete uk-select="select($item)" ng-model="value" uk-items="items">Label: {{ item.label }}, value = {{ item.value }}</uk-autocomplete>') scope
    scope.$digest()

    angular.element(el.find('li')[1]).children('a').triggerHandler 'mousedown'
    expect(selected.value).toBe 'item2'
    expect(selected.label).toBe 'Item 2 Label'
