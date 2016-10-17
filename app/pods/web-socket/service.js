import Ember from 'ember';
import config from 'frontend-chat/config/environment';

const { Service, inject, get } = Ember;

export default Service.extend({
  cable: inject.service(),

  setupConsumer(channel, room, callback) {
    const consumer = get(this, 'cable').createConsumer(`${config.wsHost}/cable`);

    return consumer.subscriptions.create({ channel, room }, {
      connected: () => {
        Ember.debug("ChatChannel#connected");
      },
      received: (data) => {
        callback(data);
      },
      disconnected: () => {
        Ember.debug("ChatChannel#disconnected");
      }
    });
  },
});
