<template>
  <div class="address-manager">
    <div class="d-flex justify-content-between mb-4">
      <h4>{{ managerTitle }}</h4>
      <button
        class="btn btn-default ws-btn btn-sm"
        v-if="isEditable && !showNewAddressForm"
        @click.prevent.stop="addNewAddress"
      >
        <font-awesome-icon icon="plus"></font-awesome-icon> Add
      </button>
    </div>

    <div
      :class="{'new-address-form-container mb-4 p-3': true,
      'animate__animated animate__slideInDown': showNewAddressForm,
      'animate__animated animate__slideUp': !showNewAddressForm}"
      v-if="isEditable && showNewAddressForm"
    >
      <h5 class="text-center mb-4">New Address Form</h5>
      <new-address-form
        @cancelNewAddress="cancelNewAddress"
        @saveNewAddress="saveNewAddress"
      />
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-dark">
        <thead>
          <tr class="text-center">
            <th>Nickname</th>
            <th>Address</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="!addresses.length"
          >
            <td
              colspan="3"
            >
              <p class="text-center"> No Address yet. </p>
            </td>
          </tr>
          <tr
            v-for="(address, index) in addresses"
            :key="address.id"
          >
            <td>{{ address.nick }} </td>
            <td>
              <address>{{ address.line1 }}</address>
            </td>
            <td>
              <div class="text-center" v-if="isEditable && address.id!=='default'">
                <button
                  class="btn btn-danger btn-sm ws-btn-rounded py-0 px-1"
                  title="Remove Address"
                  @click.prevent.stop="deleteAddress(index)"
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
import NewAddressForm from './NewAddressForm.vue';

export default {
  components: { NewAddressForm },
  name: 'AddressManager',
  props: {
    addressList: {
      type: Array,
    },
    managerTitle: {
      type: String,
      default: 'My Addresses',
    },
    isEditable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showNewAddressForm: false,
      addresses: [...this.addressList],
    };
  },
  methods: {
    cancelNewAddress() {
      this.showNewAddressForm = false;
    },
    addNewAddress() {
      this.showNewAddressForm = true;
    },
    saveNewAddress(address) {
      this.addresses.push(address);
      this.$emit('updateAddressList', this.addresses);
      this.showNewAddressForm = false;
    },
    deleteAddress(index) {
      const that = this;
      that.addresses.splice(index, 1);
      that.$emit('updateAddressList', that.addresses);
    },
  },
};
</script>

<style scoped>
  .new-address-form-container {
    box-shadow: 0 0 10px 0 #333;
    background-color: #fff;
  }
</style>
