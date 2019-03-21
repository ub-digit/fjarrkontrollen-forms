import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      bookTitle: null,
      authors: null,
      isbn: null,
      publicationYear: null,
      outsideNordics: false,
      notValidAfter: null,
      comment: null
    };
  }
});

export default Storage;
