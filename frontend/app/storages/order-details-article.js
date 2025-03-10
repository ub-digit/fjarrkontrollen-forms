import StorageObject from 'ember-local-storage/session/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      articleIdentifier: null,
      resolvedArticleIdentifier: null,
      resolvedArticleIdentifierSource: null,
      articleTitle: null,
      journalTitle: null,
      authors: null,
      issn: null,
      publicationYear: null,
      issue: null,
      volume: null,
      pages: null,
      notValidAfter: null,
      comment: null
    };
  }
});

export default Storage;
