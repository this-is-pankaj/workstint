<template>
  <div id="app">
    <AppHeader></AppHeader>
    <loader
      v-if="loaderState.isVisible"
      :text="loaderState.text"
    />
    <div class="article-container my-5">
      <router-view
        class="animate__animated animate__fadeIn"
      />
    </div>

    <AppFooter></AppFooter>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import Loader from './components/Loader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Loader,
  },
  computed: {
    ...mapGetters({ loaderState: 'loaderState' }),
  },
  methods: {
    ...mapActions({ closeLoader: 'closeLoader' }),
  },
  mounted() {
    this.closeLoader();
  },
};
</script>

<style>
/* Set all the common styling here */
.article-container {
  min-height: calc(100vh - 200px);
}

.ws-link {
  color: #459fff;
  transition: all .2s linear;
}

.ws-link:hover, .ws-link:focus {
  text-decoration: none;
}

.ws-btn, .ws-btn:disabled {
  background-color: #6c757d;
  border: 0;
  color: #fff;
}

.ws-btn-rounded {
  border-radius: 100%;
}

.ws-btn:hover,
  .ws-btn:focus,
  .ws-btn:hover:focus,
  .ws-btn:active,
  .ws-btn:active:hover:focus {
  background-color: #545b62;
  color: #fff;
}

.page-title {
  color: #545b62;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
