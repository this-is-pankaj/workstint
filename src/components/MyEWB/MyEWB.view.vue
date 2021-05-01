<template>
  <div
    :class="{'my-ewb-view': true,
    'animate__animated animate__slideInLeft': true}"
  >
    <div class="my-ewb-options d-flex justify-content-end mb-4">
      <router-link
        class="btn btn-default ws-btn"
        to="/my-ewb/new?step=role&trans=next&validate=true"
      >
        <font-awesome-icon icon="plus" class="mr-1"></font-awesome-icon> Create EWB
      </router-link>
    </div>

    <div class="table-responsive">
      <table class="table table-dark table-bordered">
        <thead>
          <tr class="text-center">
            <th> #ID </th>
            <th> Created On</th>
            <th> Valid Upto</th>
            <th> Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-if="!ewbs.length">
            <td
              colspan="5"
            >
              No E-way Bills yet.
              Click
              <router-link to="/my-ewb/new?step=role&trans=next&validate=true">here</router-link>
              to generate a new one.
            </td>
          </tr>
          <tr
            v-for="c in ewbs"
            :key="c.id"
          >
            <td> {{c.id}} </td>
            <td> {{c.created_on}} </td>
            <td> {{c.validUpto}} </td>
            <td> {{c.status}} </td>
            <td>
              <div class="text-center">
                <button
                  class="btn btn-danger btn-sm ws-btn-rounded py-0 px-1"
                  title="Delete Document"
                  @click.prevent.stop="deleteEWB(index)"
                >
                  <font-awesome-icon icon="minus"></font-awesome-icon>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyEWBView',
  data() {
    return {
      ewbs: [],
    };
  },
  methods: {
    deleteAddress(index) {
      this.ewbs.splice(index, 1);
      // todo API delete the document
    },
  },
};
</script>
