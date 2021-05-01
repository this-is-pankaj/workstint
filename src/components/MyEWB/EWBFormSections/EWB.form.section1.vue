<template>
  <form
    :class="{
      'was-validated': showValidationResults,
      'animate__animated animate__slideInRight': $route.query.trans==='next',
      'animate__animated animate__slideInLeft': $route.query.trans==='prev',
    }"
  >
    <h5 class="text-center mb-3">Invoice & Supply Details</h5>
    <div class="row">
      <form-group
        v-for="f in updatedFormGroups"
        :key="f.key"
        :formElem="f"
        :class="f.class.join(' ')"
      />
    </div>
    <div class="d-flex justify-content-between flex-wrap mt-4">
      <div class="">
        <router-link
          class="btn btn-default ws-btn mr-2"
          to="?step=role&trans=prev"
        >
          <font-awesome-icon icon="arrow-left" class="mr-2"></font-awesome-icon>
          Change Role
        </router-link>
      </div>
      <div class="d-flex justify-content-end flex-wrap">
        <router-link
          class="btn btn-default ws-btn mr-2"
          to="?step=step2&trans=next"
        > Skip
        </router-link>
        <button
          class="btn btn-default ws-btn mr-2"
          @click.prevent.stop="saveSection"
        > Save For Later
        </button>
        <button
          class="btn btn-default ws-btn mr-2"
          @click.stop.prevent="next"
        > Next
          <font-awesome-icon icon="arrow-right" class="ml-2"></font-awesome-icon>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import FormGroup from '../../FormGroup.vue';
import EWBStatics from '../MyEWB.constants';

const {
  supplyTypes,
  subSupplyTypes,
  docTypes,
  transactionTypes,
} = EWBStatics;

export default {
  components: { FormGroup },
  name: 'EWBFormSection1',
  props: {
    initValue: {
      type: Object,
      required: true,
    },
  },
  computed: {
    updatedFormGroups() {
      let groups = [...this.formGroups];
      let supplyType = '';
      groups = groups.map((f) => {
        if (f.id === 'supplyType') {
          f.options = supplyTypes;
          supplyType = f.value;
        }
        if (f.id === 'subSupplyType') {
          // Toggle ID to ensure the options update
          f.key = `${f.id}${supplyType}`;
          // f.value = ''; // Reset the value of the subSupplyType
          f.options = subSupplyTypes[supplyType];
        }
        return f;
      });
      return groups;
    },
  },
  data() {
    return {
      showValidationResults: false,
      formGroups: [
        {
          id: 'supplyType',
          key: 'supplyType',
          element: 'radio',
          label: 'Supply Type',
          name: 'supplyType',
          options: supplyTypes,
          value: this.initValue.supplyType,
          required: true,
          class: ['col-md-4'],
        },
        {
          id: 'subSupplyType',
          key: 'subSupplyType',
          element: 'radio',
          label: 'Sub Supply Type',
          name: 'subSupplyType',
          value: this.initValue.subSupplyType,
          required: true,
          class: ['col-md-8'],
        },
        {
          id: 'docType',
          key: 'docType',
          element: 'select',
          label: 'Doc Type',
          options: docTypes,
          value: this.initValue.docType,
          required: true,
          class: ['col-md-3'],
        },
        {
          id: 'docNo',
          key: 'docNo',
          element: 'input',
          label: 'Doc No.',
          type: 'text',
          placeholder: 'Document Number',
          value: this.initValue.docNo,
          required: true,
          class: ['col-md-3'],
        },
        {
          id: 'docDate',
          key: 'docDate',
          element: 'input',
          label: 'Doc Issued Date',
          type: 'date',
          value: this.initValue.docDate,
          required: true,
          class: ['col-md-3'],
        },
        {
          id: 'transactionType',
          key: 'transactionType',
          element: 'select',
          label: 'Transaction Type',
          options: transactionTypes,
          value: this.initValue.transactionType,
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
        this.$emit('proceedToNextSection', sectionData);
        // Then redirect to the step 2 page
        this.$router.push({ query: { step: 'step2', trans: 'next', validate: true } });
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
