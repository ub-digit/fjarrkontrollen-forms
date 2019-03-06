import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      name: null,
      company: null,
      address: null,
      postalCode: null,
      city: null,
      customerId: null
    };
  }
});

export default Storage;
