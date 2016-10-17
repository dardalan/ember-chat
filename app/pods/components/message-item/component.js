import Ember from 'ember';
import config from 'frontend-chat/config/environment';

const {
  Component,
  inject: { service },
  computed,
 } = Ember;

export default Component.extend({
  session: service(),

  messageUrl: computed(function() {
    return `${config['apiHost']}${this.get('message.attachment.thumb.url')}`;
  }),
});
