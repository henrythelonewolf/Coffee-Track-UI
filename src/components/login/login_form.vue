<template>
  <div class="card card-login">
    <div class="card-content">
      <img src="../../assets/logo.png" class="center" />
      <form @submit="onSubmit">
        <b-field label="Email">
          <b-input type="email" v-model="email"></b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" v-model="password"></b-input>
        </b-field>
        <b-button type="is-light" native-type="submit" expanded>Sign In</b-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      console.log(this.email);
      console.log(this.password);
    }
  }
};
</script>

<style scoped>
.card-login {
  margin-top: 25%;
  margin-left: 5%;
  margin-right: 5%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>