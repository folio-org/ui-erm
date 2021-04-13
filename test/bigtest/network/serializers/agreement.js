import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  embed: true,
  include: ['contacts'],

  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);
    return json.agreement;
  }
});
