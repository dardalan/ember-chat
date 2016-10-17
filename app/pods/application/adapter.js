import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from 'frontend-chat/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: config.apiHost,
  namespace: 'api',
  authorizer: 'authorizer:devise',

  // headers: Ember.computed('session.authToken', function() {
  //   return {
  //     'API_KEY': this.get('session.authToken'),
  //     'ANOTHER_HEADER': 'Some header value'
  //   };
  // })
  pathForType(modelName) {
    let underscored = Ember.String.underscore(modelName);
    return Ember.String.pluralize(underscored);
  },
});
