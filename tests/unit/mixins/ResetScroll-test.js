import Ember from 'ember';
import ResetscrollMixin from '../../../mixins/ResetScroll';
import { module, test } from 'qunit';

module('ResetscrollMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ResetscrollObject = Ember.Object.extend(ResetscrollMixin);
  var subject = ResetscrollObject.create();
  assert.ok(subject);
});
