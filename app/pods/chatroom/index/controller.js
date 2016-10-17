import Ember from 'ember';
import config from 'frontend-chat/config/environment';

const { Controller, inject } = Ember;

export default Controller.extend({
  session: inject.service()
});
