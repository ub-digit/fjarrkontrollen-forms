import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      orderPath: 'Web',
      currentStep: null,
      selectedLocation: null,
      selectedOrderType: null,
      selectedCustomerType: null,
      selectedDeliveryMethod: null
    };
  }
});

export default Storage;
