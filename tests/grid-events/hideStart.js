(function (window) {

  var Muuri = window.Muuri;

  QUnit.module('Grid events');

  QUnit.test('hideStart: should be triggered after grid.hide() (before the showing starts)', function (assert) {

    assert.expect(2);

    var container = utils.createGridElements().container;
    var grid = new Muuri(container);
    var teardown = function () {
      grid.destroy();
      container.parentNode.removeChild(container);
    };

    grid.hide(0, {layout: false, instant: true});
    grid.on('hideStart', function (items) {
      assert.strictEqual(arguments.length, 1, 'callback: should have one argument');
      assert.deepEqual(utils.sortItemsById(items).length, utils.sortItemsById(grid.getItems([1, 2])).length, 'callback: first argument should be an array of all the valid items that are about to be hidden');
    });
    grid.hide([0, 1, 2], {layout: false});
    teardown();

  });

})(this);