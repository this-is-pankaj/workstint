<template>
  <div class="login container p-md-4">
    <alerts
      :type="notification.type"
      v-if="notification.shouldDisplay"
      :bullets="notification.list"
      :message="notification.message"
    />
    <div class="btn-group mb-5" role="group" aria-label="Basic example">
      <router-link type="button" class="btn btn-secondary active" to="">Login</router-link>
      <router-link type="button" class="btn btn-secondary" to="/signup">Register</router-link>
    </div>
    <form
      :class="{ 'was-validated': showValidationResults }"
      @submit.prevent="logUserIn"
      novalidate
    >
      <FormGroup
        v-for="(elem, index) in formGroups"
        :formElem = "elem"
        :key="index"
      />
      <div class="form-options">
        <button class="btn btn-primary form-option ws-btn" type="submit"> Login </button>
      </div>
    </form>

    <div class="my-4 extra-links-container">
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
        id: 'username',
        element: 'input',
        label: 'Username',
        type: 'text',
        placeholder: 'Username',
        readOnly: false,
        value: '',
        disabled: false,
        required: true,
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
        id: 'rememberMe',
        element: 'checkbox',
        label: 'Remember Me',
        readOnly: false,
        value: false,
        disabled: false,
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
    ...mapActions(['login']),
    logUserIn: function (e) {
      const formObj = e.target;
      // Validate the form first
      const v = this.validateForm(formObj);
      console.log(v);
      this.showValidationResults = !v.isValid;
      if (v.isValid) {
        const formData = v.data;
        formData.password = encrypt(formData.password);
        console.log(formData);
        this.login(formData)
          .then(() => {
            this.$router.push('/');
          })
          .catch((err) => {
            this.notification.type = 'error';
            this.notification.shouldDisplay = true;
            this.notification.list = [];
            this.notification.message = err.message;
          });
      } else {
        this.notification.type = 'error';
        this.notification.shouldDisplay = true;
        this.notification.list = v.errors;
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
    .login {
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
