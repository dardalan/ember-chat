import EmberSimpleAuthSessionService from 'ember-simple-auth/services/session';
import Ember from 'ember';
import DS from 'ember-data';

const { inject, computed, get } = Ember;
const { PromiseObject } = DS;

export default EmberSimpleAuthSessionService.extend({
  store: inject.service(),

  currentUser: computed('isAuthenticated', function() {
    const { id } = get(this, 'data.authenticated');

    if (get(this, 'isAuthenticated')) {
      const promise = get(this, 'store').findRecord('user', id);
      return PromiseObject.create({ promise });
    }
  }),
});
