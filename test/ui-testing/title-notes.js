const Title = require('./er-notes');

const TITLE = {
  isPackage: false,
};

module.exports.test = (uiTestCtx) => {
  Title.test(
    uiTestCtx,
    {
      eresource: TITLE,
    },
  );
};
