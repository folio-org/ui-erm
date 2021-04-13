import { Model, hasMany } from 'miragejs';

export default Model.extend({
  contacts: hasMany('contact')
});
