<template>
  <form
    :class="{
      'was-validated': showValidationResults,
      'animate__animated animate__slideInRight': $route.query.trans==='next',
      'animate__animated animate__slideInLeft': $route.query.trans==='prev',
    }"
  >
    <h5 class="text-center mb-3">Ship To Details</h5>
    <div class="row">
      <form-group
        v-for="f in updatedFormGroups"
        :key="f.id"
        :formElem="f"
        :class="f.class.join(' ')"
      />
    </div>
    <div class="d-flex justify-content-between flex-wrap mt-4">
      <div class="">
        <router-link
          class="btn btn-default ws-btn mr-2"
          to="?step=step3&trans=prev"
        >
          <font-awesome-icon icon="arrow-left" class="mr-2"></font-awesome-icon>
          Previous
        </router-link>
      </div>
      <div class="d-flex justify-content-end flex-wrap">
        <router-link
          class="btn btn-default ws-btn mr-2"
          to="?step=step5&trans=next"
        > Skip
        </router-link>
        <button
          class="btn btn-default ws-btn mr-2"
          @click.prevent.stop="saveSection"
        > Save For Later
        </button>
        <button
          class="btn btn-default ws-btn mr-2"
          @click.prevent.stop="next"
        > Next
          <font-awesome-icon icon="arrow-right" class="ml-2"></font-awesome-icon>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import FormGroup from '../../FormGroup.vue';
import appStatic from '../../../utils/appStatic.constant';

export default {
  components: { FormGroup },
  name: 'EWBFormSection4',
  props: {
    initValue: {
      type: Object,
      required: true,
    },
  },
  computed: {
    updatedFormGroups() {
      const groups = [...this.formGroups];
      return groups;
    },
  },
  data() {
    return {
      showValidationResults: false,
      formGroups: [
        {
          id: 'toAddr1',
          element: 'input',
          label: 'Address Line 1',
          type: 'text',
          placeholder: 'Address Line 1',
          value: this.initValue.toAddr1,
          required: true,
          class: ['col-md-4'],
        },
        {
          id: 'toAddr2',
          element: 'input',
          label: 'Address Line 2',
          type: 'text',
          placeholder: 'Address Line 2',
          value: this.initValue.toAddr2,
          required: true,
          class: ['col-md-4'],
        },
        {
          id: 'toPlace',
          element: 'input',
          label: 'City',
          type: 'text',
          placeholder: 'City',
          value: this.initValue.toPlace,
          required: true,
          class: ['col-md-4'],
        },
        {
          id: 'toPincode',
          element: 'input',
          label: 'Pin Code',
          type: 'text',
          placeholder: 'Pin Code',
          value: this.initValue.toPincode,
          required: true,
          class: ['col-md-4'],
        },
        {
          id: 'actToStateCode',
          element: 'select',
          label: 'State',
          options: appStatic.stateCodes,
          value: this.initValue.actToStateCode,
          required: true,
          alwaysDisabled: true,
          class: ['col-md-4'],
        },
      ],
    };
  },
  methods: {
    saveSection: function () {
      // Validate the form first
      const v = this.validateForm();
      // No need to show the validation result. Save data as is
      const sectionData = v.data;
      console.log(sectionData);
      this.$emit('saveForm', sectionData);
    },
    next: function () {
      // Validate the form first
      const v = this.validateForm();
      this.showValidationResults = !v.isValid;
      // If Valid, proceed to the next step
      if (v.isValid) {
        const sectionData = v.data;
        // Update the main data source with this data Set
        this.$emit('proceedToNextSection', sectionData);
        // Then redirect to the step 3 page
        this.$router.push({ query: { step: 'step5', validate: true } });
      }
    },
    validateForm: function () {
      const vObj = {
        errors: [],
        isValid: true,
        data: {},
      };

      const fieldsList = [...this.formGroups];

      const formData = {};
      for (let i = 0; i < fieldsList.length; i++) {
        const fieldObj = fieldsList[i];
        formData[fieldObj.id] = fieldObj.value;
        // Check if the required fields have values
        if (fieldObj.required && !fieldObj.value) {
          vObj.isValid = false;
          vObj.errors.push(`Invalid Value for ${fieldObj.label}.`);
        }
      }

      vObj.data = formData;
      return vObj;
    },
  },
};
</script>
