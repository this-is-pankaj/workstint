<template>
  <div class="my-clients container">
    <div class="mb-4">
      <h3 class="page-title text-center">My Clients</h3>
    </div>

    <router-view class="mt-5"/>
  </div>
</template>

<script>
export default {
  name: 'MyClients',
  beforeMount() {
    if (!this.$store.getters.isUserAuthenticated) {
      this.$router.push({ path: '/login', query: { redirect: 'clients' } });
    }
  },
};
</script>
