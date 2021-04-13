const Docs = require('./docs');

const DOCS = [{
  name: 'Misc Paper',
  note: 'Signed',
  location: 'Filing Cabinet',
  url: 'http://licenses.com/final'
}, {
  name: 'Folder of secrets',
  url: 'http://agreements.com/secrets'
}];

const EDITED_DOC = {
  docToEdit: DOCS[0].name,
  ...DOCS[0],
  appendName: ' v2',
  appendNote: ' and filed',
  appendLocation: ' in Archives',
  appendUrl: '2'
};

const DELETED_DOC = DOCS[1].name;

const DOCS_FIELD_NAME = 'supplementaryDocs';

module.exports.test = (uiTestCtx) => {
  Docs.test(
    uiTestCtx,
    {
      docs: DOCS,
      editedDoc: EDITED_DOC,
      deletedDoc: DELETED_DOC,
      docsFieldName: DOCS_FIELD_NAME,
    },
  );
};
