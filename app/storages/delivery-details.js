import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      address: null,
      postalCode: null,
      city: null,
      box: null,
      comment: null
    };
  }
});

export default Storage;
