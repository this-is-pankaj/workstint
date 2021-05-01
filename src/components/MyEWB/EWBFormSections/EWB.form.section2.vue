<template>
  <form
    :class="{
      'was-validated': showValidationResults,
      'animate__animated animate__slideInRight': $route.query.trans==='next',
      'animate__animated animate__slideInLeft': $route.query.trans==='prev',
    }"
  >
    <h5 class="text-center mb-3">Client Details</h5>
    <div class="row">
      <form-group
        v-for="f in updatedFormGroups"
        :key="f.id"
        :formElem="f"
        :class="f.class.join(' ')"
      />
    </div>

    <div
      class="d-flex justify-content-center"
    >
      <label>
        <input
          type="checkbox"
          :checked="isShipToDifferent"
          class="mr-2"
          v-model="isShipToDifferent"
        />
        <span>Ship to a different Client</span>
      </label>
    </div>

    <div class="row"
      v-if="isShipToDifferent"
    >
      <form-group
        v-for="f in updatedFormGroupsDiffClient"
        :key="f.id"
        :formElem="f"
        :class="f.class.join(' ')"
      />
    </div>

    <div class="d-flex justify-content-between flex-wrap mt-4">
      <div class="">
        <router-link
          class="btn btn-default ws-btn mr-2"
          to="?step=step1&trans=prev"
        >
          <font-awesome-icon icon="arrow-left" class="mr-2"></font-awesome-icon>
          Previous
        </router-link>
      </div>
      <div class="d-flex justify-content-end flex-wrap">
        <router-link
          class="btn btn-default ws-btn mr-2"
          to="?step=step3&trans=next"
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
  name: 'EWBFormSection2',
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
    updatedFormGroupsDiffClient() {
      const groups = [...this.formGroupsDiffClient];
      return groups;
    },
  },
  data() {
    return {
      showValidationResults: false,
      isShipToDifferent: this.initValue.shipToGSTIN || false,
      formGroups: [
        {
          id: 'toGstin',
          element: 'input',
          label: 'GST Number',
          type: 'text',
          placeholder: 'GST Number',
          value: this.initValue.toGstin,
          required: true,
          class: ['col-md-4'],
        },
        {
          id: 'toTrdName',
          element: 'input',
          label: 'Trade Name',
          type: 'text',
          placeholder: 'Trade Name',
          value: this.initValue.toTrdName,
          required: true,
          alwaysDisabled: true,
          class: ['col-md-4'],
        },
        {
          id: 'toStateCode',
          element: 'select',
          label: 'State',
          options: appStatic.stateCodes,
          value: this.initValue.toStateCode,
          required: true,
          alwaysDisabled: true,
          class: ['col-md-4'],
        },
      ],
      formGroupsDiffClient: [
        {
          id: 'shipToGSTIN',
          element: 'input',
          label: 'Recepient\'s GST Number',
          type: 'text',
          placeholder: 'GST Number',
          value: this.initValue.shipToGSTIN,
          required: true,
          class: ['col-md-4'],
        },
        {
          id: 'shipToTradeName',
          element: 'input',
          label: 'Recepient\'s Trade Name',
          type: 'text',
          placeholder: 'Trade Name',
          value: this.initValue.shipToTradeName,
          required: true,
          alwaysDisabled: true,
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
        console.log(sectionData);
        // Update the main data source with this data Set
        this.$emit('proceedToNextSection', sectionData);
        // Then redirect to the step 3 page
        this.$router.push({ query: { step: 'step3', validate: true } });
      }
    },
    validateForm: function () {
      const vObj = {
        errors: [],
        isValid: true,
        data: {},
      };

      let fieldsList = [...this.formGroups];
      if (this.isShipToDifferent) {
        fieldsList = fieldsList.concat(this.formGroupsDiffClient);
      }

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
