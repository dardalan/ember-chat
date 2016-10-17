import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";
import { defaultPaginationParams } from 'frontend-chat/constants';

const { Route, RSVP, get, inject, set, assign } = Ember;

export default Route.extend(InfinityRoute, {
  session: inject.service(),

  totalPagesParam: "meta.total-pages", // instead of "meta.total_pages"

  model({ chatroom_id }) {
    const { store } = this;
    const chatroom = store.findRecord('chatroom', chatroom_id);

    return RSVP.hash({
      chatroom,
      users: store.findAll('user'),
      messages: this.infinityModel('message', {
        ...defaultPaginationParams,
        chatroom_id,
        modelPath: 'controller.messages'
      }),
    });
  },

  setupController(controller, model) {
    let hash = assign({}, model, { isExiting: false });

    this._super(...arguments);
    controller.setProperties(hash);
  },

  resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.setProperties({
        isExiting,
        messageBody: '',
        includedTypedUsers: []
      });
      Ember.run.scheduleOnce('destroy', this, () => {
        get(controller, 'subscription').unsubscribe();
        Ember.Logger.debug('ChatChannel#unsubscribed')
      });
    }
  },

  _infinityLoad() {
    if (this.get('_loadingMore') || !this.get('_canLoadMore')) {
      return;
    }

    return this._loadNextPage();
  },

  actions: {
    infinityLoad(infinityModel) {
      let messages = Ember.$('.messages'),
      initHeight = messages[0].scrollHeight;

      if (infinityModel === this._infinityModel()) {
        this._infinityLoad().then((res) => {
          Ember.run.scheduleOnce('afterRender', this, () => {
            let newHeight = messages[0].scrollHeight;
            messages.animate({ scrollTop: newHeight - initHeight }, 0);
          });
        });
      } else {
        return true;
      }
    }
  }
});
