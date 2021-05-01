<template>
  <div class="new-client-form">
    <div
      class="d-flex justify-content-center"
      v-if="action === 'new'"
    >
      <label>
        <input
          type="checkbox"
          :checked="clientHasGST"
          class="mr-2"
          v-model="clientHasGST"
        />
        <span>Client has a valid GSTIN</span>
      </label>
    </div>

    <form
      :class="{ 'was-validated': showValidationResults }"
      @submit.prevent.stop=""
    >
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-default ws-btn btn-sm mx-2"
          @click.prevent.stop="saveNewClient"
        >
          <font-awesome-icon icon="save"></font-awesome-icon> Save
        </button>
        <button
          class="btn btn-default ws-btn btn-sm mx-2"
          @click.prevent.stop="cancel"
          v-if="action!=='new'"
        >
          <font-awesome-icon icon="window-close"></font-awesome-icon> Cancel
        </button>
      </div>
      <div class="row">
        <form-group
          v-for="(elem, index) in formFields"
          :key="index"
          :formElem="elem"
          :class="elem.class.join(' ')"
        />
      </div>
    </form>

    <div class="profile-extras">
      <address-manager
        :addressList="addresses"
        managerTitle="Client Addresses"
        :isEditable="isEditable"
        @updateAddressList="saveNewAddress"
      />
    </div>
  </div>
</template>

<script>
import AddressManager from './AddressManager.vue';
import FormGroup from './FormGroup.vue';

export default {
  components: { FormGroup, AddressManager },
  name: 'NewClientForm',
  props: {
    action: {
      type: String,
      default: 'new',
    },
  },
  computed: {
    formFields() {
      const fields = [...this.formGroups];
      if (this.clientHasGST) {
        return fields;
      }
      const fieldsToBeRemoved = ['gstin', 'tradeName'];
      // If client has no GST, remove GST & TradeName field
      const fieldsWithoutGST = fields.filter((f) => fieldsToBeRemoved.indexOf(f.id) < 0);
      return fieldsWithoutGST;
    },
  },
  data() {
    return {
      showValidationResults: false,
      clientHasGST: true,
      addresses: [],
      isEditable: this.action !== 'view',
      formGroups: [
        {
          id: 'nick',
          element: 'input',
          label: 'Nick Name',
          type: 'text',
          placeholder: 'Nick Name',
          value: '',
          required: true,
          class: ['col-md-6'],
        },
        {
          id: 'gstin',
          element: 'input',
          label: 'Client GSTIN',
          type: 'text',
          placeholder: 'GSTIN',
          value: '',
          required: true,
          class: ['col-md-6'],
        },
        {
          id: 'tradeName',
          element: 'input',
          label: 'Company Name',
          type: 'text',
          placeholder: 'Company Name',
          value: '',
          disabled: true,
          alwaysDisabled: true,
          class: ['col-md-6'],
        },
        {
          id: 'contactPerson',
          element: 'input',
          label: 'Contact Person',
          type: 'text',
          placeholder: 'Contact Person',
          value: '',
          required: true,
          class: ['col-md-6'],
        },
        {
          id: 'email',
          element: 'input',
          label: 'Client Email ID',
          type: 'email',
          placeholder: 'Client Email ID',
          value: '',
          required: true,
          class: ['col-md-6'],
        },
        {
          id: 'phone',
          element: 'input',
          label: 'Client Phone Number',
          type: 'tel',
          placeholder: 'Client Phone Number',
          value: '',
          required: true,
          class: ['col-md-6'],
        },
      ],
    };
  },
  methods: {
    saveNewClient() {
      // Validate the form first
      const v = this.validateForm();
      this.showValidationResults = !v.isValid;
      if (v.isValid) {
        const clientProfile = v.data;
        clientProfile.addresses = this.addresses;
        console.log(clientProfile);
        this.isEditable = false;
      }
    },
    validateForm: function () {
      const vObj = {
        errors: [],
        isValid: true,
        data: {},
      };

      const fieldsList = [...this.formFields];

      const client = {};
      for (let i = 0; i < fieldsList.length; i++) {
        const fieldObj = fieldsList[i];
        client[fieldObj.id] = fieldObj.value;
        // Check if the required fields have values
        if (fieldObj.required && !fieldObj.value) {
          vObj.isValid = false;
          vObj.errors.push(`Invalid Value for ${fieldObj.label}.`);
        }
      }

      vObj.data = client;
      return vObj;
    },
    saveNewAddress(updatedAddressList) {
      this.addresses = [...updatedAddressList];
    },
  },
};
</script>
