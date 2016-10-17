import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
  session: Ember.inject.service(),

  totalPagesParam: "meta.total-pages", // instead of "meta.total_pages"

  model() {
    return Ember.RSVP.hash({
      chatrooms: this.infinityModel('chatroom', {
        perPage: 10,
        startingPage: 1,
        modelPath: 'controller.chatrooms'
      }),
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties(model);
  }
});
