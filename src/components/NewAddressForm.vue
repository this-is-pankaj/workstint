<template>
  <form
    :class="{ 'was-validated': showValidationResults }"
    @submit.prevent.stop=""
  >
    <alerts
      :type="notification.type"
      v-if="notification.shouldDisplay"
      :bullets="notification.list"
    />
    <div class="row">
      <form-group
        v-for="(elem, index) in formGroups"
        :key="index"
        :formElem="elem"
        class="col-md-4"
      />
    </div>
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-default ws-btn btn-sm mx-2"
        @click.prevent.stop="saveNewAddress"
      >
        <font-awesome-icon icon="save"></font-awesome-icon> Save
      </button>
      <button
        class="btn btn-default ws-btn btn-sm mx-2"
        @click.prevent.stop="cancel"
      >
        <font-awesome-icon icon="window-close"></font-awesome-icon> Cancel
      </button>
    </div>
  </form>
</template>

<script>
import Alerts from './Alerts.vue';
import FormGroup from './FormGroup.vue';

export default {
  components: {
    FormGroup,
    Alerts,
  },
  name: 'NewAddressForm',
  props: {

  },
  methods: {
    cancel: function () {
      this.$emit('cancelNewAddress');
    },
    saveNewAddress: function () {
      // Validate the form first
      const v = this.validateForm();
      console.log(v);
      this.showValidationResults = !v.isValid;
      if (v.isValid) {
        const creds = v.data;
        creds.id = creds.nick.split(' ').join('_');
        this.$emit('saveNewAddress', creds);
      } else {
        this.notification.type = 'error';
        this.notification.shouldDisplay = true;
        this.notification.list = v.errors;
      }
    },
    validateForm: function () {
      const vObj = {
        errors: [],
        isValid: true,
        data: {},
      };

      const fieldsList = [...this.formGroups];

      const creds = {};
      for (let i = 0; i < fieldsList.length; i++) {
        const fieldObj = fieldsList[i];
        creds[fieldObj.id] = fieldObj.value;
        // Check if the required fields have values
        if (fieldObj.required && !fieldObj.value) {
          vObj.isValid = false;
          vObj.errors.push(`Invalid Value for ${fieldObj.label}.`);
        }
      }

      vObj.data = creds;
      return vObj;
    },
  },
  data() {
    return {
      showValidationResults: false,
      formGroups: [
        {
          id: 'nick',
          element: 'input',
          label: 'Nick Name',
          type: 'text',
          placeholder: 'Nick Name',
          value: '',
          required: true,
        },
        {
          id: 'line1',
          element: 'input',
          label: 'Line 1',
          type: 'text',
          placeholder: 'Line 1',
          value: '',
          required: true,
        },
        {
          id: 'line2',
          element: 'input',
          label: 'Line 2',
          type: 'text',
          placeholder: 'Line 2',
          value: '',
          required: false,
        },
        {
          id: 'line3',
          element: 'input',
          label: 'Line 3',
          type: 'text',
          placeholder: 'Line 3',
          value: '',
          required: false,
        },
        {
          id: 'city',
          element: 'input',
          label: 'City',
          type: 'text',
          placeholder: 'City',
          value: '',
          required: true,
        },
        {
          id: 'pinCode',
          element: 'input',
          label: 'Pin Code',
          type: 'text',
          placeholder: '6-Digit Pin Code',
          value: '',
          required: true,
        },
        {
          id: 'state',
          element: 'input',
          label: 'State',
          type: 'text',
          placeholder: 'State (full name)',
          value: '',
          required: true,
        },
      ],
      notification: {
        shouldDisplay: false,
        list: [],
        type: 'default',
      },
    };
  },
};
</script>
