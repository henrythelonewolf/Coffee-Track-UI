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
          <b-menu>
          <b-menu-list label="Menu">
            <!-- user menu items -->
            <b-menu-item icon="home" label="Overview" tag="router-link" :to="{ path: '/dashboard/overview' }"></b-menu-item>
            <b-menu-item icon="coffee" :active="isCoffeeActive" v-on:click="toggleCoffeeActive">
              <template slot="label" slot-scope="props">
                Coffee
                <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
              </template>
              <b-menu-item icon="feather" label="Create" tag="router-link" to="/dashboard/create-coffee"></b-menu-item>
            </b-menu-item>
            <b-menu-item icon="account" label="Account" tag="router-link" :to="{ path: '/dashboard/account' }"></b-menu-item>
            <!-- admin menu items -->
            <b-menu-item icon="settings" :active="isActive" expanded v-if="isAdmin">
              <template slot="label" slot-scope="props">
                Administrator
                <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
              </template>
              <b-menu-item icon="account" label="Users"></b-menu-item>
              <b-menu-item icon="cellphone-link">
                <template slot="label">
                  Devices
                  <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                    <b-icon icon="dots-vertical" slot="trigger"></b-icon>
                    <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-menu-item>
              <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
            </b-menu-item>
          </b-menu-list>
          <b-menu-list label="Actions">
            <b-menu-item label="Logout" v-on:click="onLogout"></b-menu-item>
          </b-menu-list>
        </b-menu>
        </div>
      </b-sidebar>

      <div class="p-1 main-content">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import { deauthorize, isAdmin } from '../services/authorization.service';
export default {
  name: 'Dashboard',
  data() {
    return {
      expandOnHover: false,
      mobile: "reduce",
      reduce: false,
      fullHeight: true,
      isAdmin: false,
      isCoffeeActive: false
    };
  },
  methods: {
    onLogout() {
      deauthorize();
      this.$router.push('/');
    },
    toggleCoffeeActive(e) {
      console.log(e);
      this.isCoffeeActive = !this.isCoffeeActive;
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

.main-content {
  flex-grow: 1;
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
