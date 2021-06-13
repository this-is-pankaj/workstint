<template>
  <div class="signup container p-md-4">
    <alerts
      :type="notification.type"
      v-if="notification.shouldDisplay"
      :bullets="notification.list"
      :message="notification.message"
    />
    <div class="btn-group mb-5" role="group" aria-label="Basic example">
      <router-link type="button" class="btn btn-secondary" to="/login">Login</router-link>
      <router-link type="button" class="btn btn-secondary active" to="">Register</router-link>
    </div>
    <form
      :class="{ 'was-validated': showValidationResults }"
      @submit.prevent="signup"
      novalidate
    >
      <FormGroup
        v-for="(elem, index) in formGroups"
        :formElem = "elem"
        :key="index"
      />
      <div class="form-options">
        <button class="btn btn-primary form-option ws-btn" type="submit"> Sign Up </button>
      </div>
    </form>

    <div class="my-4 extra-links-container">
      <p class="mb-0"> Already Registered?
        <router-link to="/login" class="ws-link"> Login Here </router-link>
      </p>
      <p class="mb-0">
        <router-link to="/forgot-password" class="ws-link"> Forgot Password? </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Alerts from '../components/Alerts.vue';
import FormGroup from '../components/FormGroup.vue';
import { encrypt } from '../utils/commonUtils';

export default {
  name: 'login',
  components: {
    FormGroup,
    Alerts,
  },
  data: () => ({
    showValidationResults: false,
    formGroups: [
      {
        id: 'firstName',
        element: 'input',
        label: 'First Name',
        type: 'text',
        placeholder: 'First Name',
        readOnly: false,
        value: '',
        disabled: false,
        required: true,
      },
      {
        id: 'middleName',
        element: 'input',
        label: 'Middle Name',
        type: 'text',
        placeholder: 'Middle Name',
        readOnly: false,
        value: '',
        disabled: false,
        required: false,
      },
      {
        id: 'lastName',
        element: 'input',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Last Name',
        readOnly: false,
        value: '',
        disabled: false,
        required: true,
      },
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
        // eslint-disable-next-line no-useless-escape
        pattern: '\\d{10}',
      },
      {
        id: 'password',
        element: 'inputGrp',
        grpType: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Password',
        readOnly: false,
        value: '',
        disabled: false,
        required: true,
      },
      {
        id: 'confirmPassword',
        element: 'inputGrp',
        grpType: 'password',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Re-Enter Password',
        readOnly: false,
        value: '',
        disabled: false,
        required: true,
      },
      {
        id: 'termsAgreed',
        element: 'checkbox',
        label: 'I Agree to the Terms & Conditions.',
        readOnly: false,
        value: false,
        disabled: false,
        required: true,
      },
    ],
    notification: {
      shouldDisplay: false,
      list: [],
      message: '',
      type: 'default',
    },
  }),
  methods: {
    ...mapActions(['register']),
    signup: function (e) {
      const formObj = e.target;
      // Validate the form first
      const v = this.validateForm(formObj);
      console.log(v);
      this.showValidationResults = !v.isValid;
      if (v.isValid) {
        const formData = v.data;
        formData.password = encrypt(formData.password);
        console.log(formData);
        this.register(formData)
          .then(() => {
            this.$router.push('/');
          })
          .catch((err) => {
            this.notification.type = 'error';
            this.notification.list = [];
            this.notification.shouldDisplay = true;
            this.notification.message = err.message;
          });
      } else {
        this.notification.type = 'error';
        this.notification.list = v.errors;
        this.notification.shouldDisplay = true;
        this.notification.message = '';
      }
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
        vObj.isValid = false;
        vObj.errors.push('Values in Confirm Password & Password fields do not match.');
      }

      vObj.data = creds;
      return vObj;
    },
  },
};
</script>

<style scoped>
  .btn-group {
    width: 100%;
  }

  .btn-group .active {
    font-weight: bold;
  }

  .form-options {
    text-align: center;
  }

  .form-option {
    min-width: 200px;
    width: 100%;
  }

  @media screen and (min-width: 992px){
    .signup {
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
