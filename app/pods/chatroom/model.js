import DS from 'ember-data';
import { memberAction, collectionAction } from 'ember-api-actions';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  title: attr('string'),
  messages: hasMany('message'),
  members: hasMany('user'),

  messagesStatus: memberAction({ path: 'messages_status' }),
});
