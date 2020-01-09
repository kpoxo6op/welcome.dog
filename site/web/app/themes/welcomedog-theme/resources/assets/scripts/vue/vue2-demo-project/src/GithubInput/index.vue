<template>
  <form v-on:submit.prevent="onSubmit">
    <input type="text" v-model="username" placeholder="Enter a github username here" />
    <button type="submit">Go!</button>
  </form>
</template>

<script src="./script.js"></script>
<style scoped src="./style.css"></style>
<!--
-v-on attaches an event listener to the element.
v-on is how we bind to DOM events in Vue and call a function.
For example, <p v-on:click="foo">Click me!</p>
would call the component’s foo method every time the paragraph was clicked. 
Taking our template above into consideration:
v-on:submit.prevent="onSubmit" binds the method onSubmit to be run when the form is submitted.
By adding .prevent that means that Vue will automatically prevent the default action from occurring.






v-model creates a two-way binding on a form input element or a component.
v-model is effectively listening for change events on the form input and updating the data in the Vue component to match
Taking our template above into consideration:
v-model:username binds the input’s value to a value, username, in our code (script.js).
When we created GithubInput we declared that it had a piece of data, username,
and here we’ve bound that piece of data to the input field. The two will automatically be kept in sync.
-->


