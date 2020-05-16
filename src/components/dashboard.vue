<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        type="is-light"
        :fullheight="fullHeight"
        open
      >
        <div class="sidebar-contents p-1">
          <div class="block">
            <img
              src="../assets/logo.png"
            />
          </div>
          <b-menu class="is-custom-mobile">
            <!-- <b-menu-list label="Menu">
              <b-menu-item icon="information-outline" label="Info"></b-menu-item>
              <b-menu-item active expanded icon="settings" label="Administrator">
                <b-menu-item icon="account" label="Users"></b-menu-item>
                <b-menu-item icon="cellphone-link" label="Devices"></b-menu-item>
                <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
              </b-menu-item>
              <b-menu-item icon="account" label="My Account">
                <b-menu-item icon="account-box" label="Account data"></b-menu-item>
                <b-menu-item icon="home-account" label="Addresses"></b-menu-item>
              </b-menu-item>
            </b-menu-list>
            <b-menu-list>
              <b-menu-item label="Expo" icon="link"></b-menu-item>
            </b-menu-list> -->
            <b-menu-list label="Menu">
              <b-menu-item icon="account" label="My Account" v-if="isAdmin">
                <b-menu-item icon="account-box" label="Account data"></b-menu-item>
                <b-menu-item icon="home-account" label="Addresses"></b-menu-item>
              </b-menu-item>
            </b-menu-list>
            <b-menu-list label="Account">
              <b-menu-item icon="logout" label="Logout" v-on:click="onLogout"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>

      <div class="p-1">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import { deauthorize,  isAdmin } from '../services/authorization.service';
export default {
  name: 'Dashboard',
  data() {
    return {
      expandOnHover: false,
      mobile: "reduce",
      reduce: false,
      fullHeight: true,
      isAdmin: false
    };
  },
  methods: {
    onLogout() {
      deauthorize();
      this.$router.push('/');
    }
  },
  beforeMount() {
    this.isAdmin = isAdmin();
  }
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}

.sidebar-contents {
  min-height: 100vh
}

.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
