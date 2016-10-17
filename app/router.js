import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('chatroom', function() {
    this.route('new');
    this.route('show', { path: ':chatroom_id'});
  });
  this.route('login');
});

export default Router;
