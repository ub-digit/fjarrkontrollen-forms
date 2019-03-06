import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      id: null,
      identifier: null,
      title_sv: null,
      title_en: null
    };
  }
});

export default Storage;
