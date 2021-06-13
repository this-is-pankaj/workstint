<template>
  <div class="my-profile container">
    <div class="mb-4">
      <h3 class="page-title text-center">My Profile</h3>
    </div>

    <alerts
      :type="notification.type"
      v-if="notification.shouldDisplay"
      :bullets="notification.list"
      :message="notification.message"
    />
    <form
      :class="{ 'was-validated': showValidationResults }"
      @submit.stop.prevent="updateProfile"
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
        <FormGroup
          :formElem = "elem"
          v-for="elem in computedFormGroups"
          :key="elem.id+elem.disabled"
          :class="elem.class.join(' ')"
        />
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
import Alerts from '../components/Alerts.vue';
import CredentialsManager from '../components/CredentialsManager.vue';
import FormGroup from '../components/FormGroup.vue';
// import { encrypt } from '../utils/commonUtils';
import reqUtils from '../utils/requestUtils';
import patterns from '../utils/fieldsPattern';

const flattenRes = (profile) => {
  if (!profile.firstName) {
    const { firstName, middleName, lastName } = profile.name;
    delete profile.name;
    profile.firstName = firstName;
    profile.middleName = middleName;
    profile.lastName = lastName;
  }
  return profile;
};

const updateFieldsWithFetchedValues = (fields, values) => {
  const flattenedValues = flattenRes(values);
  const updatedFields = fields.map((g) => {
    g.value = flattenedValues[g.id];
    return g;
  });
  return updatedFields;
};

export default {
  name: 'myProfile',
  components: {
    FormGroup,
    AddressManager,
    CredentialsManager,
    Alerts,
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
          class: ['col-md-4'],
        },
        {
          id: 'middleName',
          element: 'input',
          label: 'Middle Name',
          type: 'text',
          placeholder: 'Middle Name',
          value: '',
          required: false,
          class: ['col-md-4'],
        },
        {
          id: 'lastName',
          element: 'input',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Last Name',
          value: '',
          required: true,
          class: ['col-md-4'],
        },
        {
          id: 'email',
          element: 'input',
          label: 'Email ID',
          type: 'email',
          placeholder: 'Email',
          value: '',
          required: true,
          class: ['col-md-6'],
        },
        {
          id: 'phone',
          element: 'input',
          label: 'Phone',
          type: 'tel',
          placeholder: 'Phone',
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
          id: 'gstin',
          element: 'inputGrp',
          label: 'My GSTIN',
          type: 'gstin',
          placeholder: 'GSTIN',
          pattern: patterns.gstin,
          value: '',
          required: true,
          class: ['col-md-6'],
          customClickAction: this.updateTradeName,
        },
      ],
      profileGstinDetails: null,
      addresses: [],
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
      notification: {
        shouldDisplay: false,
        list: [],
        message: '',
        type: 'default',
      },
    };
  },
  mounted() {
    reqUtils.sendRequest('myProfile')
      .then((profile) => {
        // Assign values to the formGroups
        this.formGroups = updateFieldsWithFetchedValues([...this.formGroups], profile);
        this.addresses = profile.addresses || [];
      })
      .catch((err) => {
        this.notification.type = 'error';
        this.notification.shouldDisplay = true;
        this.notification.list = [];
        this.notification.message = err.message;
        console.log(err);
      });
  },
  methods: {
    enableEditing() {
      this.isEditable = true;
    },
    getCurrentFieldValue(field) {
      const matchingField = this.formGroups.find((f) => f.id === field);
      return matchingField.value;
    },
    updateTradeName(gstin) {
      reqUtils.sendRequest('fetchGstinInfo', { id: gstin })
        .then((info) => {
          this.profileGstinDetails = info;
          this.notification.type = 'success';
          this.notification.shouldDisplay = true;
          this.notification.list = [];
          this.notification.message = 'Company Details Fetched Successfully!';
          this.formGroups = this.formGroups.map((f) => {
            if (f.id === 'tradeName') {
              console.log(info);
              f.value = info.tradeName;
            }
            return f;
          });
          const incomingLoc = info.adAddress.loc.split(',');
          this.addresses = [
            {
              nick: 'Default',
              line1: `${info.adAddress.bno}, ${info.adAddress.st}`,
              line2: `${info.adAddress.flno}, ${info.adAddress.bnm}`,
              line3: `${info.adAddress.loc}`,
              // If city is not available, try looking for the city name in loc property and pick the last string from the same.
              city: `${info.adAddress.city || (incomingLoc.length > 1 ? incomingLoc[incomingLoc.length - 1] : incomingLoc[0])}`,
              district: info.adAddress.dist,
              pinCode: info.adAddress.pncd,
              state: info.adAddress.stcd,
            },
          ];
        })
        .catch((err) => {
          this.notification.type = 'error';
          this.notification.shouldDisplay = true;
          this.notification.list = [];
          this.notification.message = err.message;
        });
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
        reqUtils.sendRequest('updateMyProfile', {}, updatedProfile)
          .then((res) => {
            this.notification.type = 'success';
            this.notification.shouldDisplay = true;
            this.notification.list = [];
            this.notification.message = 'Profile Updated Successfully!';
            this.formGroups = updateFieldsWithFetchedValues([...this.formGroups], res);
          })
          .catch((err) => {
            console.log(err);
            this.notification.type = 'error';
            this.notification.shouldDisplay = true;
            this.notification.list = [];
            this.notification.message = err.message;
          });
        this.isEditable = false;
      } else {
        this.notification.shouldDisplay = true;
        this.notification.type = 'error';
        this.notification.list = v.errors;
        this.notification.message = '';
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

      const formObj = {};
      for (let i = 0; i < fieldsList.length; i++) {
        const fieldObj = fieldsList[i];
        formObj[fieldObj.id] = fieldObj.value;
        // Check if the required fields have values
        if (fieldObj.required && !fieldObj.value) {
          vObj.isValid = false;
          vObj.errors.push(`Invalid Value for ${fieldObj.label}.`);
        }
      }

      vObj.data = formObj;
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
