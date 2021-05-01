<template>
  <div class="my-profile container">
    <div class="mb-4">
      <h3 class="page-title text-center">My Profile</h3>
    </div>

    <form
      :class="{ 'was-validated': showValidationResults }"
      @submit.prevent="updateProfile"
      novalidate
    >
      <div class="my-profile-options d-flex justify-content-end">
        <button
          class="btn btn-default ws-btn"
          v-if="!isEditable"
          @click.prevent.stop="enableEditing"
        >
          <font-awesome-icon icon="edit"></font-awesome-icon> Edit
        </button>
        <button
          class="btn btn-default ws-btn"
          v-if="isEditable"
        >
          <font-awesome-icon icon="save"></font-awesome-icon> Save Profile
        </button>
      </div>
      <div class="row mb-4">
        <div class="col-md-4" v-for="elem in computedFormGroups" :key="elem.id+elem.disabled">
          <FormGroup
            :formElem = "elem"
          />
        </div>
      </div>
    </form>

    <div class="profile-extras">
      <address-manager
        :addressList="addresses"
        managerTitle="My Addresses"
        :isEditable="isEditable"
        @updateAddressList="saveNewAddress"
      />
      <credentials-manager
        :isEditable="isEditable"
        :credentials="credentials"
      />
    </div>
  </div>
</template>

<script>
import AddressManager from '../components/AddressManager.vue';
import CredentialsManager from '../components/CredentialsManager.vue';
import FormGroup from '../components/FormGroup.vue';
// import { encrypt } from '../utils/commonUtils';

export default {
  name: 'myProfile',
  components: {
    FormGroup,
    AddressManager,
    CredentialsManager,
  },
  computed: {
    computedFormGroups() {
      return this.formGroups.map((g) => {
        if (!g.alwaysDisabled) {
          g.disabled = !this.isEditable;
        }
        return g;
      });
    },
  },
  data() {
    return {
      showValidationResults: false,
      isEditable: false,
      formGroups: [
        {
          id: 'firstName',
          element: 'input',
          label: 'First Name',
          type: 'text',
          placeholder: 'First Name',
          value: '',
          required: true,
        },
        {
          id: 'middleName',
          element: 'input',
          label: 'Middle Name',
          type: 'text',
          placeholder: 'Middle Name',
          required: false,
        },
        {
          id: 'lastName',
          element: 'input',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Last Name',
          value: '',
          required: true,
        },
        {
          id: 'email',
          element: 'input',
          label: 'Email ID',
          type: 'email',
          placeholder: 'Email',
          value: '',
          required: true,
        },
        {
          id: 'phone',
          element: 'input',
          label: 'Phone',
          type: 'tel',
          placeholder: 'Phone',
          value: '',
          required: true,
        },
        {
          id: 'gstin',
          element: 'input',
          label: 'My GSTIN',
          type: 'text',
          placeholder: 'GSTIN',
          value: '',
          required: true,
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
        },
      ],
      addresses: [
        {
          id: 'default',
          nick: 'Default',
          line1: 'test line 1',
        },
      ],
      credentials: {
        ewb: {
          username: {
            disabled: true,
            value: '',
          },
          password: {
            disabled: true,
            value: '',
          },
        },
      },
    };
  },
  methods: {
    enableEditing() {
      this.isEditable = true;
    },
    saveNewAddress(updatedList) {
      this.addresses = [...updatedList];
    },
    updateProfile: function () {
      // Validate the form first
      const v = this.validateForm();
      this.showValidationResults = !v.isValid;
      if (v.isValid) {
        const updatedProfile = v.data;
        updatedProfile.addresses = this.addresses;
        updatedProfile.credentials = this.credentials;
        console.log(updatedProfile);
        this.isEditable = false;
      }
    },
    validateForm: function () {
      const vObj = {
        errors: [],
        isValid: true,
        data: {},
      };

      // vObj.isValid = formElement.checkValidity();
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

      // Check if password and confirm password have same values
      // if (creds.password !== creds.confirmPassword) {
      //   vObj.errors.push('Values in Confirm Password & Password fields do not match.');
      // }

      vObj.data = creds;
      return vObj;
    },
  },
};
</script>

<style scoped>
  .form-options {
    text-align: center;
  }

  .form-option {
    min-width: 200px;
    width: 100%;
  }

  .btn-group {
    width: 100%;
  }

  .btn-group .active {
    font-weight: bold;
  }

  @media screen and (min-width: 992px){
    /* .my-profile {
      width: 50%;
      box-shadow: 0 0 10px 0 #aaa;
    } */

    .form-option {
      width: auto;
    }
  }

  .extra-links-container {
    font-size: 90%;
  }
</style>
