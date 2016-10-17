import Ember from 'ember';

export default Ember.Component.extend({
  loadText: 'Load more',
  loadedText: 'model entirely Loaded',

  click() {
    this.sendAction();
  }
});
