<template>
  <div class="footer p-3 d-md-flex flex-md-row-reverse justify-content-md-between">
    <p class="mb-md-0"><span class="copyright">&copy;</span> 2021 WorkStint India</p>
    <div class="quick-links mb-3 mb-md-0">
      <router-link to="/contact" class="ws-link">Contact</router-link> |
      <router-link to="/about" class="ws-link">About Us</router-link> |
      <router-link to="/support" class="ws-link">Support </router-link>
    </div>
    <p class="mb-0"> Made with <span class="heart">&hearts;</span> in India. </p>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
}

.ws-link {
  color: #8ac3ff;
}

.heart {
  color: red;
}
</style>
