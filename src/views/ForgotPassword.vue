<template>
  <div class="forgot-password container p-md-4">
    <div class="mb-4">
      <h3 class="page-title text-center"> Reset Password </h3>
    </div>
    <form
      :class="{ 'was-validated': showValidationResults }"
      @submit.prevent="resetPassword"
      novalidate
    >
      <FormGroup
        v-for="(elem, index) in formGroups"
        :formElem = "elem"
        :key="index"
      />
      <div class="form-options">
        <button class="btn btn-primary form-option ws-btn" type="submit"> Reset Password </button>
      </div>
    </form>

    <div class="my-4 extra-links-container">
      <p class="mb-0"> Not Registered?
        <router-link to="/signup" class="ws-link"> Signup Here </router-link>
      </p>
      <p class="mb-0">
        <router-link to="/login" class="ws-link"> Back to Login </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import FormGroup from '../components/FormGroup.vue';
import { encrypt } from '../utils/commonUtils';

export default {
  name: 'login',
  components: {
    FormGroup,
  },
  data: () => ({
    showValidationResults: false,
    formGroups: [
      {
        id: 'email',
        element: 'input',
        label: 'Email ID',
        type: 'email',
        placeholder: 'Email ID',
        readOnly: false,
        value: '',
        disabled: false,
        required: true,
      },
      {
        id: 'phone',
        element: 'input',
        label: 'Phone',
        type: 'tel',
        placeholder: 'Phone Number',
        readOnly: false,
        value: '',
        disabled: false,
        required: true,
      },
      {
        id: 'password',
        element: 'inputGrp',
        grpType: 'password',
        label: 'New Password',
        type: 'password',
        placeholder: 'New Password',
        readOnly: false,
        value: '',
        disabled: false,
        required: true,
      },
      {
        id: 'confirmPassword',
        element: 'inputGrp',
        grpType: 'password',
        label: 'Confirm New Password',
        type: 'password',
        placeholder: 'Re-enter New Password',
        readOnly: false,
        value: '',
        disabled: false,
        required: true,
      },
    ],
  }),
  methods: {
    resetPassword: function (e) {
      const formObj = e.target;
      // Validate the form first
      const v = this.validateForm(formObj);
      console.log(v);
      this.showValidationResults = !v.isValid;
      const creds = v.data;
      creds.password = encrypt(creds.password);
      console.log(creds);
    },
    validateForm: function (formElement) {
      const vObj = {
        errors: [],
        isValid: true,
        data: {},
      };

      vObj.isValid = formElement.checkValidity();
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
      if (creds.password !== creds.confirmPassword) {
        vObj.errors.push('Values in Confirm Password & Password fields do not match.');
      }

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

  @media screen and (min-width: 992px){
    .forgot-password {
      width: 50%;
      box-shadow: 0 0 10px 0 #aaa;
    }

    .form-option {
      width: auto;
    }
  }

  .extra-links-container {
    font-size: 90%;
  }
</style>
