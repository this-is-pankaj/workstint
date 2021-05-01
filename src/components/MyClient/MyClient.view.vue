<template>
  <div
    :class="{'my-client-view': true,
    'animate__animated animate__slideInLeft': true}"
  >
    <div class="my-clients-options d-flex justify-content-end mb-4">
      <router-link
        class="btn btn-default ws-btn"
        to="/clients/new"
      >
        <font-awesome-icon icon="plus" class="mr-1"></font-awesome-icon> Add New
      </router-link>
    </div>

    <div class="table-responsive">
      <table class="table table-dark table-bordered">
        <thead>
          <tr class="text-center">
            <th> Nickname </th>
            <th> Company Name (GSTIN)</th>
            <th> Email ID </th>
            <th> Contact Number </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-if="!clients.length">
            <td
              colspan="5"
            >
              No Clients yet. Click <router-link to="/clients/new">here</router-link> to add.
            </td>
          </tr>
          <tr
            v-for="c in clients"
            :key="c.id"
          >

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyClientView',
  data() {
    return {
      clients: [],
    };
  },
};
</script>
