<template>
  <form
    :class="{
      'was-validated': showValidationResults,
      'animate__animated animate__slideInRight': $route.query.trans==='next',
      'animate__animated animate__slideInLeft': $route.query.trans==='prev',
    }"
  >
    <!-- <h5 class="text-center mb-3">Product Details</h5> -->

    <product-manager
      :itemsList="initValue.itemList"
      managerTitle="Invoiced Items"
      :isEditable="true"
      @listUpdated="updateItemsList"
    />

    <div class="d-flex justify-content-between flex-wrap mt-4">
      <div class="my-2">
        <router-link
          class="btn btn-default ws-btn mr-2"
          to="?step=step4&trans=prev"
        >
          <font-awesome-icon icon="arrow-left" class="mr-2"></font-awesome-icon>
          Previous
        </router-link>
      </div>
      <div class="d-flex justify-content-end flex-wrap my-2">
        <router-link
          class="btn btn-default ws-btn mr-2"
          to="?step=step6&trans=next"
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
import ProductManager from '../../ProductManager.vue';

export default {
  components: { ProductManager },
  name: 'EWBFormSection5',
  props: {
    initValue: {
      type: Object,
      required: true,
    },
  },
  computed: {
  },
  data() {
    return {
      showValidationResults: false,
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
    updateItemsList: function (list) {
      this.$emit('proceedToNextSection', { itemList: list });
    },
    next: function () {
      // Validate the form first
      const v = this.validateForm();
      this.showValidationResults = !v.isValid;
      // If Valid, proceed to the next step
      if (v.isValid) {
        // Then redirect to the step 3 page
        this.$router.push({ query: { step: 'step6', validate: true } });
      }
    },
    validateForm: function () {
      const vObj = {
        errors: [],
        isValid: true,
        data: {},
      };

      const items = this.initValue.itemList;
      if (!items.length) {
        vObj.isValid = false;
        vObj.errors.push('No Items Added');
      }
      vObj.data = items;
      return vObj;
    },
  },
};
</script>
