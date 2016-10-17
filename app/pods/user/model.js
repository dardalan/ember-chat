import DS from 'ember-data';
import Ember from 'ember';
import config from 'frontend-chat/config/environment';
import { validator, buildValidations } from 'ember-cp-validations';

const { Model, attr, hasMany } = DS;
const { computed } = Ember;

const Validations = buildValidations({
  email: [
    validator('presence', {
      presence: true,
      description: 'Email'
    }),
    validator('format', {
        type: 'email',
        description: 'Email'
      }
    )
  ],
  password: [
    validator('presence', {
      presence: true,
      description: 'Password'
    }),
    validator('length', {
      min: 6,
      max: 30,
      description: 'Password'
    })
  ],
  passwordConfirmation: [
    validator('presence', {
      presence: true,
      description: 'Password'
    }),
    validator('confirmation', {
      on: 'password',
      message: '{description} do not match',
      description: 'Passwords'
    })
  ]
});

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  password: attr(),
  passwordConfirmation: attr(),
  
  chatrooms: hasMany('chatroom'),

  fullName: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
});
