import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      newspaper: null,
      period: null,
      startyear: null,
      notValidAfter: null,
      comment: null
    };
  }
});

export default Storage;
