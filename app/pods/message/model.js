import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  body: attr('string'),
  createdAt: attr('string'),
  updatedAt: attr('string'),
  status: attr('string'),
  attachment: attr(),
  attachmentId: attr('string'),

  chatroom: belongsTo('chatroom'),
  user: belongsTo('user'),
});
