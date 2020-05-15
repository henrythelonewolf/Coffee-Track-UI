<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <LoginForm/>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import LoginForm from './login/login_form';
export default {
  name: 'Landing',
  components: {
    LoginForm
  }
};
</script>

<style scoped>
</style>