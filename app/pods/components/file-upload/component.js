import EmberUploader from 'ember-uploader';
import config from 'frontend-chat/config/environment';

const { inject: { service }, isEmpty } = Ember;

export default EmberUploader.FileField.extend({
  session: service(),

  url: `${config.apiHost}/api/attachments`,

  filesDidChange(files) {
    const { token } = this.get('session.data.authenticated');
    const headers = {
      'Authorization': `Token token="${token}"`
    };
    const uploader = EmberUploader.Uploader.create({
      url: this.get('url'),
      method: 'POST',
      ajaxSettings: { headers },
    });

    if (!isEmpty(files)) {
      // this second argument is optional and can to be sent as extra data with the upload
      //uploader.upload(files[0]).then(res => console.log(res));
      this.attrs.addAttachment(files[0], uploader);
    }
  }
});
