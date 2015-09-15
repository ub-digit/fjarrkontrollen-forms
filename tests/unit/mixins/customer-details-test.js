import Ember from 'ember';
import CustomerDetailsMixin from '../../../mixins/customer-details';
import { module, test } from 'qunit';

module('CustomerDetailsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var CustomerDetailsObject = Ember.Object.extend(CustomerDetailsMixin);
  var subject = CustomerDetailsObject.create();
  assert.ok(subject);
});
