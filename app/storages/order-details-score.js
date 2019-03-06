import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      composers: null,
      opusTitle: null,
      publicationType: null,
      notValidAfter: null,
      comment: null
    };
  }
});

export default Storage;
