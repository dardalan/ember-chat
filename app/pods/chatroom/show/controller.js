import Ember from 'ember';
import config from 'frontend-chat/config/environment';
import { debounceDelay } from 'frontend-chat/constants';

const {
  Controller,
  get,
  set,
  inject,
  isPresent,
  observer,
  computed,
  run,
  typeOf
} = Ember;

export default Controller.extend({
  session: inject.service(),
  webSocket: inject.service(),

  subscription: null,
  isExiting: false,
  messageBody: '',
  includedTypedUsers: [],

  isValid: computed.notEmpty('messageBody'),
  immediate: computed.bool('isExiting'),

  filteredTypedUsers: computed('includedTypedUsers.[]', function() {
    return get(this, 'includedTypedUsers').uniq();
  }),

  setupWebSocketConnection: observer('model.isLoaded', function() {
    const chatroomId = get(this, 'model.chatroom.id');
    const subscription = get(this, 'webSocket').setupConsumer('ChatChannel', chatroomId, this.updateRecord.bind(this));

    set(this, 'subscription', subscription);
    this.updateMessagesStatus();
    run.scheduleOnce('afterRender', this, 'scrollToLastMessage');
  }),

  updateMessagesStatus() {
    let model = get(this, 'model');
    let chatroom = get(model, 'chatroom');
    let unreadMessages = get(model, 'messages').filterBy('status', 'unread');

    if (unreadMessages.length) {
      unreadMessages.setEach('status', 'read');
      chatroom.messagesStatus();
    }
  },

  checkTyping: observer('messageBody', function() {
    run.debounce(this, this.updateAnnounce, debounceDelay, get(this, 'isExiting'));
  }),

  searchByText: observer('search', function() {
    run.debounce(this, this.findQuery, debounceDelay);
  }),

  scrollToLastMessage() {
    let messages = Ember.$('.messages');
    if (messages.length > 0 && messages[0]) { messages.animate({ scrollTop: messages[0].scrollHeight }, 0); }
  },

  sortedMessages: computed('messages.[]', function() {
    return get(this, 'messages').toArray().reverse();
  }),

  findQuery() {
    let query = get(this, 'search');
    //backend query... search by message body
    //backend return array of messages by coincidence
  },

  updateAnnounce() {
    let subscription = get(this, 'subscription');
    let id = get(this, 'session.currentUser.id');
    const callback = (type, isTyping) => {
      subscription.perform(type, { user: { id, typing: isTyping } });
    };

    if (get(this, 'messageBody')) {
      run.scheduleOnce('actions', callback.bind(this, "announce", true));
    } else {
      run.scheduleOnce('actions', callback.bind(this, "announce", false));
    }
  },

  updateRecord(data) {
    Ember.debug( "Socket::updateRecord(data) -> " + Ember.inspect(data) );
    let currentUserId = get(this, 'session.currentUser.id');
    let incomingUser = data.user ? Number(data.user.id) === Number(currentUserId) : null;
    let targetUser = data.user ? get(this, 'store').peekRecord('user', data.user.id) : null;

    if (typeOf(data.user) === 'object' && !incomingUser && data.user.typing) {
      get(this, 'includedTypedUsers').pushObject(targetUser);
    } else {
      get(this, 'includedTypedUsers').removeObject(targetUser);
    }

    if (data.initiator_id && Number(data.initiator_id) !== Number(currentUserId)) {
      this.store.findRecord('message', data.message_id).then((record) => {
        set(record, 'status', 'read');
        get(this, 'messages.content').unshiftObject(get(record, '_internalModel'));
        run.scheduleOnce('afterRender', this, 'scrollToLastMessage');
      });
    }
  },

  actions: {
    addMessage(body) {
      let chatroom = get(this, 'model.chatroom');
      let message = this.store.createRecord('message', { body, chatroom });

      if (isPresent(body)) {
        message.save().then((rec) => {
          get(this, 'messages.content').unshiftObject(get(rec, '_internalModel'));
          run.scheduleOnce('afterRender', this, 'scrollToLastMessage');
        });
        set(this, 'messageBody', '');
      }
    },

    addAttachment(attachment, uploader) {
      let chatroom = get(this, 'model.chatroom');
      let message = this.store.createRecord('message', { chatroom });

      if (isPresent(attachment)) {
        uploader.upload(attachment).then( ({ id }) => {
          set(message, 'attachmentId', id);
          return message.save();
        }).then((rec) => {
          get(this, 'messages.content').unshiftObject(get(rec, '_internalModel'));
          run.scheduleOnce('afterRender', this, 'scrollToLastMessage');
        });
        set(this, 'messageBody', '');
      }
    }
  }
});
