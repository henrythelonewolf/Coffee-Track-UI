<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <LoginForm v-on:authenticated="onAuthenticated"/>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import LoginForm from './login/login_form';
import { authorize } from '../services/authorization.service';

export default {
  name: 'Landing',
  components: {
    LoginForm
  },
  methods: {
    onAuthenticated(payload) {
      authorize(payload);
      this.$router.push('/dashboard/overview').catch((err) => console.log(err));
    }
  }
};
</script>

<style scoped>
</style>