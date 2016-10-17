import Devise from 'ember-simple-auth/authenticators/devise';
import config from 'frontend-chat/config/environment';

export default Devise.extend({
  serverTokenEndpoint: `${config.apiHost}/api/sessions`
});
