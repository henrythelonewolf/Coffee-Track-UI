<template>
  <div>
    <b-navbar type="is-white has-shadow">
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/dashboard/overview' }">Dashboard</b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-dropdown right label="Account">
          <b-navbar-item tag="router-link" :to="{ path: '/dashboard/account' }">Account Details</b-navbar-item>
          <b-navbar-item v-on:click="onLogout">Logout</b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { deauthorize } from "../services/authorization.service";
export default {
  methods: {
    onLogout() {
      deauthorize();
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
</style>