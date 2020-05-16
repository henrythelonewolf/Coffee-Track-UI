<template>
  <div class="card card-login">
    <div class="card-content">
      <img src="../../assets/logo.png" class="center" />
      <form @submit="onSubmit">
        <b-field label="Email">
          <b-input required type="email" v-model="email"></b-input>
        </b-field>
        <b-field label="Password">
          <b-input required type="password" v-model="password"></b-input>
        </b-field>
        <p class="has-text-danger error-message" v-if="hasError">Email or password is invalid.</p>
        <b-button type="is-light" native-type="submit" expanded>Sign In</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import { authenticate } from '../../services/authorization.service';

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      hasError: false,
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const result = await authenticate({
        email: this.email,
        password: this.password
      });

      if (result == null) {
        this.hasError = true;
        return;
      }

      this.hasError = false;
      this.$emit('authenticated', result);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

.card {
  &-login {
    margin-top: 25%;
    margin-left: 5%;
    margin-right: 5%;
  }
}

.error-message {
  margin-bottom: 15px;
  font-size: $size-7;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>