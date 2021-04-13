const Pkg = require('./er-notes');

const PKG = {
  isPackage: true,
};

module.exports.test = (uiTestCtx) => {
  Pkg.test(
    uiTestCtx,
    {
      eresource: PKG,
    },
  );
};
