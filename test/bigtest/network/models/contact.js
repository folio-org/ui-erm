import { Model, belongsTo } from 'miragejs';

export default Model.extend({
  agreement: belongsTo()
});
