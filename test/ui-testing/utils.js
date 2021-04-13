// Utilities for tests in this repo.
/* global before, after, Nightmare */ // eslint-disable-line

module.exports.formattedDate = function formattedDate(datestring) {
  const date = new Date(datestring);

  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
};

module.exports.shouldNavToEResources = function shouldNavToEResources(nightmare) {
  it('should open eresources', done => {
    nightmare
      .waitUntilNetworkIdle(1000)
      .click('#clickable-nav-eresources')
      .waitUntilNetworkIdle(1000)
      .then(done)
      .catch(done);
  });
};
