<template>
  <div
    :class="{'my-client-new': true,
    'animate__animated animate__slideInRight': true}"
  >
    <div class="my-clients-options mb-4">
      <router-link
        class="btn btn-default ws-btn"
        to="/clients"
      >
        <font-awesome-icon icon="long-arrow-alt-left" class="mr-1"></font-awesome-icon> View All
      </router-link>
    </div>

    <div class="new-client-form">
      <new-client-form
        action="new"
      />
    </div>
  </div>
</template>

<script>
import NewClientForm from '../NewClientForm.vue';

export default {
  components: { NewClientForm },
  name: 'MyClientNew',
  data() {
    return {
    };
  },
};
</script>
