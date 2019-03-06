import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      name: null,
      emailAddress: null,
      organisation: null,
      department: null,
      unit: null,
      address: null,
      postalCode: null,
      city: null,
      libraryCardNumber: null,
      xAccount: null
    };
  }
});

export default Storage;
