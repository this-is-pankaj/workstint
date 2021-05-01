<template>
  <div
    :class="{
      'animate__animated animate__slideInRight': $route.query.trans==='next',
      'animate__animated animate__slideInLeft': $route.query.trans==='prev',
    }"
  >
    <h5 class="text-center mb-3">Role Selection</h5>
    <div class="d-flex justify-content-center">
      <button
        class="btn btn-default ws-btn mr-2"
        @click.prevent.stop="setRole('buyer')"
      > Buyer
        <font-awesome-icon icon="arrow-right" class="ml-2"></font-awesome-icon>
      </button>
      <button
        class="btn btn-default ws-btn mr-2"
        @click.stop.prevent="setRole('seller')"
      > Seller
        <font-awesome-icon icon="arrow-right" class="ml-2"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EWBFormSection0',
  props: {
    initValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showValidationResults: false,
    };
  },
  methods: {
    setRole: function (role) {
      const roleData = {
        buyer: {
          role: 'buyer',
          fromGstin: '',
          fromTrdName: '',
          fromStateCode: '',
          toGstin: 'USER GSTIN',
          toTrdName: 'USER TRADENAME',
          toStateCode: '',
        },
        seller: {
          role: 'seller',
          fromGstin: 'USER GSTIN',
          fromTrdName: 'USER TRADENAME',
          fromStateCode: '',
          toGstin: '',
          toTrdName: '',
          toStateCode: '',
        },
      };
      // Update the main data source with this data Set
      this.$emit('proceedToNextSection', roleData[role]);
      // Then redirect to the step 1 page
      this.$router.push({ query: { step: 'step1', trans: 'next', validate: true } });
    },
  },
  mounted: function () {
    // if (this.initValue.role) {
    //   // Then redirect to the step 1 page
    //   this.$router.push({ query: { step: 'step1', trans: 'next', validate: true } });
    // }
  },
};
</script>
