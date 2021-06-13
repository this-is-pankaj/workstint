<template>
  <div class="header">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg ws-navbar">
      <a href="/" class="navbar-brand">WorkStint</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#wsNavBar"
        aria-controls="wsNavBar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <font-awesome-icon icon="bars"></font-awesome-icon>
      </button>
      <div class="collapse navbar-collapse" id="wsNavBar">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li
            class="nav-item"
            v-if="!isLoggedIn"
          >
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li
            class="nav-item active-on-child-route"
            v-if="isLoggedIn"
          >
            <router-link class="nav-link" to="/clients">Clients</router-link>
          </li>
          <li
            class="nav-item active-on-child-route"
            v-if="isLoggedIn"
          >
            <router-link class="nav-link" to="/my-ewb">Eway Bills</router-link>
          </li>
        </ul>
        <div
          class="dropdown"
          v-if="isLoggedIn"
        >
          <div
            class="dropdown-toggle profile-dropdown"
            id="profileDropDown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <font-awesome-icon icon="user"></font-awesome-icon>
          </div>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="profileDropDown"
          >
            <router-link class="dropdown-item" to="/my-profile">Profile</router-link>
            <p
              class="dropdown-item my-0"
              @click.prevent.stop="logUserOut"
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters({ isLoggedIn: 'isUserAuthenticated', userProfile: 'userProfile' }),
  },
  methods: {
    ...mapActions(['logout']),
    logUserOut() {
      this.logout()
        .then(() => {
          this.$router.push('/login');
        });
    },
  },
};
</script>

<style scoped>
.header {
  box-shadow: 0 0 5px 0 #ddd;
}

.ws-navbar {
  background: transparent;
  padding: 0 15px;
}

.nav-item {
  min-width: 100px;
}

.nav-link {
  border-bottom: 4px solid transparent;
  transition: all .2s linear;
}

.profile-dropdown {
  width: 100px;
  padding: 8px;
  text-align: right;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

a.router-link-exact-active,
  .active-on-child-route a.router-link-active {
  color: #545b62 !important;
}

@media screen and (min-width: 992px) {
  .nav-item {
    text-align: center;
  }

  a.router-link-exact-active,
    .active-on-child-route a.router-link-active {
    border-bottom: 4px solid #545b62;
  }
}
</style>
