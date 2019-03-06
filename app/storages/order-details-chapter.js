import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      chapterTitle: null,
      bookTitle: null,
      authors: null,
      isbn: null,
      publicationYear: null,
      pages: null,
      notValidAfter: null,
      comment: null
    };
  }
});

export default Storage;
