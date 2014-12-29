describe 'ukAdaptiveNavbar directive', ->

  beforeEach -> module 'ukAdaptiveNavbar'
  beforeEach -> module 'src/adaptive-navbar/adaptive-navbar.html'

  $rootScope = {}
  $compile   = {}
  $location  = {}
  testItems = [
    { title: 'Item 1', path: '/item1' }
    { title: 'Item 2', path: '/item2' }
  ]

  beforeEach -> inject (_$rootScope_, _$compile_, _$location_) ->
    $rootScope = _$rootScope_
    $compile = _$compile_
    $location = _$location_

  it 'should bind to uk-adaptive-navbar directive', ->
    el = $compile('<uk-adaptive-navbar></uk-adaptive-navbar>') $rootScope
    $rootScope.$digest()
    expect(el.children('div').length > 0).toBe true

  it 'should render items provided by uk-items attribute', ->
    $rootScope.menuItems = testItems
    el = $compile('<uk-adaptive-navbar uk-items="menuItems"></uk-adaptive-navbar>') $rootScope
    $rootScope.$digest()
    expect(el.html()).toContain 'href="#/item1"'
    expect(el.html()).toContain '>Item 1</a>'
    expect(el.html()).toContain 'href="#/item2"'
    expect(el.html()).toContain '>Item 2</a>'

  it 'should mark current path with uk-active', ->
    $rootScope.menuItems = testItems
    el = $compile('<uk-adaptive-navbar uk-items="menuItems"></uk-adaptive-navbar>') $rootScope
    $rootScope.$digest()
    link1 = angular.element(el.find('li')[0])
    link2 = angular.element(el.find('li')[1])
    expect(link1.hasClass('uk-active')).toBe false
    expect(link2.hasClass('uk-active')).toBe false
    $location.path('item2')
    $rootScope.$digest()
    expect(link1.hasClass('uk-active')).toBe false
    expect(link2.hasClass('uk-active')).toBe true
    $location.path('item1')
    $rootScope.$digest()
    expect(link1.hasClass('uk-active')).toBe true
    expect(link2.hasClass('uk-active')).toBe false
