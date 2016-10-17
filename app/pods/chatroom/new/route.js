import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      users: this.store.findAll('user'),
      chatroom: this.store.createRecord('chatroom')
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties(model);
  }
});
