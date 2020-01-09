//Our GithubInput component will need to do two things:
// - Keep track of the current value of the input
// - Communicate that the value has changed, so that other components can know and therefore update their state.

//import bus module and use it by emitting an event when the username changes
import bus from '../bus'

export default {
  name: 'GithubInput',
  //create a piece of data that’s associated with the component
  //This says that this component has a piece of data, username,
  //that it owns and is responsible for
  data() {
    return {
      username: '',
    }
  },
  //We can refer to data directly on this, so this.username will give us the latest value of the text box.
  //If it’s not empty, we want to let other components know that the data has changed.
  //For this, we’ll use a message bus
  methods: {
    onSubmit() {
      if (this.username && this.username !== '') {
        bus.$emit('new-username', this.username)
      }
    },
  },
}
