describe 'ukAdaptiveNavbar directive', ->

  beforeEach -> module 'ukAdaptiveNavbar'
  beforeEach -> module 'src/adaptive-navbar/adaptive-navbar.html'

  $rootScope = {}
  $compile   = {}

  beforeEach -> inject (_$rootScope_, _$compile_) ->
    $rootScope = _$rootScope_
    $compile = _$compile_

  it 'should bind to uk-adaptive-navbar directive', ->
    el = $compile('<uk-adaptive-navbar></uk-adaptive-navbar>') $rootScope
    $rootScope.$digest()
    expect(el.children('div').length > 0).toBe true
