<template>
  <form
    :class="{ 'was-validated': showValidationResults }"
    @submit.prevent.stop=""
  >
    <div class="d-flex justify-content-end mb-4">
      <button
        class="btn btn-default ws-btn btn-sm mx-2"
        @click.prevent.stop="saveNewItem"
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

    <div class="d-flex justify-content-end">
      <p> Taxable Amount: {{taxableAmount}} </p>
    </div>

    <div class="row">
      <form-group
        v-for="(elem, index) in formFields"
        :key="index"
        :formElem="elem"
        :class="elem.class.join(' ')"
      />
    </div>
  </form>
</template>

<script>
import FormGroup from './FormGroup.vue';

export default {
  components: { FormGroup },
  name: 'NewItemForm',
  data() {
    return {
      showValidationResults: false,
      formFields: [
        {
          id: 'productName',
          element: 'input',
          type: 'text',
          label: 'Item Name',
          placeholder: 'Item Name',
          value: '',
          required: true,
          class: ['col-md-4'],
        },
        {
          id: 'productDesc',
          element: 'input',
          type: 'text',
          label: 'Item Description',
          placeholder: 'Item Description',
          value: '',
          required: true,
          class: ['col-md-6'],
        },
        {
          id: 'hsnCode',
          element: 'input',
          type: 'text',
          label: 'HSN Code',
          placeholder: 'HSN Code',
          value: '',
          required: true,
          class: ['col-md-2'],
        },
        {
          id: 'quantity',
          element: 'input',
          type: 'text',
          label: 'Quantity',
          placeholder: 'Qty',
          value: '0',
          required: true,
          class: ['col-md-2'],
        },
        {
          id: 'qtyUnit',
          element: 'input',
          type: 'text',
          label: 'Unit',
          placeholder: 'Qty Unit',
          value: '',
          required: true,
          class: ['col-md-2'],
        },
        {
          id: 'price',
          element: 'input',
          type: 'text',
          label: 'Rate per unit',
          placeholder: 'Rate',
          value: '0',
          required: true,
          class: ['col-md-2'],
        },
        {
          id: 'cgstRate',
          element: 'input',
          type: 'text',
          label: 'CGST(%)',
          placeholder: 'CGST',
          value: '0',
          required: true,
          class: ['col-md-2'],
        },
        {
          id: 'sgstRate',
          element: 'input',
          type: 'text',
          label: 'SGST(%)',
          placeholder: 'SGST',
          value: '0',
          required: true,
          class: ['col-md-2'],
        },
        {
          id: 'igstRate',
          element: 'input',
          type: 'text',
          label: 'IGST(%)',
          placeholder: 'IGST',
          value: '0',
          required: true,
          class: ['col-md-2'],
        },
        {
          id: 'cessRate',
          element: 'input',
          type: 'text',
          label: 'Cess(%)',
          placeholder: 'Cess',
          value: '0',
          required: true,
          class: ['col-md-2'],
        },
        {
          id: 'cessNonAdvol',
          element: 'input',
          type: 'text',
          label: 'Cess Non-Advol',
          placeholder: 'Cess Non-Advol',
          value: '0',
          required: true,
          class: ['col-md-2'],
        },
      ],
    };
  },
  computed: {
    taxableAmount() {
      const fields = [...this.formFields];
      let qty = 0;
      let price = 0;
      fields.filter((f) => {
        if (f.id === 'quantity') {
          qty = f.value;
        }
        if (f.id === 'price') {
          price = f.value;
        }
        return f;
      });
      return (qty * price || 0).toFixed(2);
    },
  },
  methods: {
    saveNewItem() {
      // Validate the form first
      const v = this.validateForm();
      console.log(v);
      this.showValidationResults = !v.isValid;
      if (v.isValid) {
        const dataObj = v.data;
        dataObj.taxableAmount = this.taxableAmount;
        this.$emit('saveNewItem', dataObj);
      }
    },
    cancel() {
      this.$emit('cancelNewItem');
    },
    validateForm: function () {
      const vObj = {
        errors: [],
        isValid: true,
        data: {},
      };

      const fieldsList = [...this.formFields];

      const valueObj = {};
      for (let i = 0; i < fieldsList.length; i++) {
        const fieldObj = fieldsList[i];
        valueObj[fieldObj.id] = fieldObj.value;
        // Check if the required fields have values
        if (fieldObj.required && !fieldObj.value) {
          vObj.isValid = false;
          vObj.errors.push(`Invalid Value for ${fieldObj.label}.`);
        }
      }

      vObj.data = valueObj;
      return vObj;
    },
  },
};
</script>
