import Ember from 'ember';

const { Controller, get, isPresent } = Ember;

export default Controller.extend({
  actions: {
    createChatroom() {
      let chatroom = get(this, 'chatroom');

      if (isPresent(get(chatroom, 'title'))) {
        chatroom.save().then((chatroom) => {
          this.transitionToRoute('chatroom.index');
        });
      }
    },

    addMember(member) {
      get(this, 'chatroom.members').pushObject(member);
    },

    removeMember(member) {
      get(this, 'chatroom.members').removeObject(member);
    }
  }
});
