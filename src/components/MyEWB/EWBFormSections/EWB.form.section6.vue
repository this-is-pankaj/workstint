<template>
  <form
    :class="{
      'was-validated': showValidationResults,
      'animate__animated animate__slideInRight': $route.query.trans==='next',
      'animate__animated animate__slideInLeft': $route.query.trans==='prev',
    }"
  >
    <h5 class="text-center mb-3">Tranporter Details</h5>
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
          to="?step=step5&trans=prev"
        >
          <font-awesome-icon icon="arrow-left" class="mr-2"></font-awesome-icon>
          Previous
        </router-link>
      </div>
      <div class="d-flex justify-content-end flex-wrap">
        <button
          class="btn btn-default ws-btn mr-2"
          @click.prevent.stop="saveSection"
        > Save For Later
        </button>
        <button
          class="btn btn-default ws-btn mr-2"
          @click.prevent.stop="next"
        > Generate
          <font-awesome-icon icon="arrow-right" class="ml-2"></font-awesome-icon>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import FormGroup from '../../FormGroup.vue';
import EWBStatics from '../MyEWB.constants';

export default {
  components: { FormGroup },
  name: 'EWBFormSection6',
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
          id: 'transDistance',
          element: 'input',
          label: 'Distance (in Kms)',
          type: 'text',
          placeholder: 'Distance',
          value: this.initValue.transDistance,
          required: true,
          class: ['col-md-3'],
        },
        {
          id: 'transMode',
          element: 'select',
          label: 'Mode Of Transport',
          options: EWBStatics.transportationMode,
          value: this.initValue.transMode,
          required: true,
          class: ['col-md-3'],
        },
        {
          id: 'vehicleType',
          element: 'select',
          label: 'Type Of Vehicle',
          options: EWBStatics.vehicleType,
          value: this.initValue.vehicleType,
          required: true,
          class: ['col-md-3'],
        },
        {
          id: 'vehicleNo',
          element: 'input',
          label: 'Vehicle Number',
          type: 'text',
          placeholder: 'Vehicle No.',
          value: this.initValue.vehicleNo,
          required: true,
          class: ['col-md-3'],
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
        this.$emit('generateEWB', sectionData);
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
