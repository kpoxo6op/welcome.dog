<template>
  <form v-on:submit.prevent='onSubmit'>
    <input type='text' v-model='username' placeholder='Enter a github username here' />
    <button type='submit'>Boris app Go!</button>
  </form>
</template>

<script>
//Our GithubInput component will need to do two things:
// - Keep track of the current value of the input
// - Communicate that the value has changed, so that other components can know and therefore update their state.

//import bus module and use it by emitting an event when the username changes
import bus from '../bus';
export default {
  //create a piece of data that’s associated with the component
  //This says that this component has a piece of data, username,
  //that it owns and is responsible for
  data() {
    return {
      username: '',
    };
  },
  //We can refer to data directly on this, so this.username will give us the latest value of the text box.
  //If it’s not empty, we want to let other components know that the data has changed.
  //For this, we’ll use a message bus
  methods: {
    onSubmit() {
      if (this.username && this.username !== '') {
        bus.$emit('new-username', this.username);
      }
    },
  },
};
</script>
<style></style>
<!--
-v-on attaches an event listener to the element.
v-on is how we bind to DOM events in Vue and call a function.
For example, <p v-on:click='foo'>Click me!</p>
would call the component’s foo method every time the paragraph was clicked. 
Taking our template above into consideration:
v-on:submit.prevent='onSubmit' binds the method onSubmit to be run when the form is submitted.
By adding .prevent that means that Vue will automatically prevent the default action from occurring.






v-model creates a two-way binding on a form input element or a component.
v-model is effectively listening for change events on the form input and updating the data in the Vue component to match
Taking our template above into consideration:
v-model:username binds the input’s value to a value, username, in our code (script.js).
When we created GithubInput we declared that it had a piece of data, username,
and here we’ve bound that piece of data to the input field. The two will automatically be kept in sync.
-->


