<template>
  <div
    :class="{'my-ewb-new': true,
    'animate__animated animate__slideInRight': true}"
  >
    <div class="my-ewb-options mb-4">
      <router-link
        class="btn btn-default ws-btn"
        to="/my-ewb"
      >
        <font-awesome-icon icon="long-arrow-alt-left" class="mr-1"></font-awesome-icon> View All
      </router-link>
    </div>

    <div class="new-ewb-form p-3">
      <!-- <router-view/> -->
      <EWBFormSection0
        :initValue="ewbValues"
        v-if="$route.query.step==='role'"
        @proceedToNextSection="updateEWBValues"
      />
      <EWBFormSection1
        :initValue="ewbValues"
        v-if="$route.query.step==='step1'"
        @proceedToNextSection="updateEWBValues"
      />
      <EWBFormSection2
        :initValue="ewbValues"
        v-if="$route.query.step==='step2'"
        @proceedToNextSection="updateEWBValues"
      />
      <EWBFormSection3
        :initValue="ewbValues"
        v-if="$route.query.step==='step3'"
        @proceedToNextSection="updateEWBValues"
      />
      <EWBFormSection4
        :initValue="ewbValues"
        v-if="$route.query.step==='step4'"
        @proceedToNextSection="updateEWBValues"
      />
      <EWBFormSection5
        :initValue="ewbValues"
        v-if="$route.query.step==='step5'"
        @proceedToNextSection="updateEWBValues"
      />
      <EWBFormSection6
        :initValue="ewbValues"
        v-if="$route.query.step==='step6'"
        @generateEWB="generateEWB"
      />
    </div>
  </div>
</template>

<script>
import EWBFormSection0 from './EWBFormSections/EWB.form.section0.vue';
import EWBFormSection1 from './EWBFormSections/EWB.form.section1.vue';
import EWBFormSection2 from './EWBFormSections/EWB.form.section2.vue';
import EWBFormSection3 from './EWBFormSections/EWB.form.section3.vue';
import EWBFormSection4 from './EWBFormSections/EWB.form.section4.vue';
import EWBFormSection5 from './EWBFormSections/EWB.form.section5.vue';
import EWBFormSection6 from './EWBFormSections/EWB.form.section6.vue';

export default {
  components: {
    EWBFormSection1,
    EWBFormSection2,
    EWBFormSection3,
    EWBFormSection4,
    EWBFormSection0,
    EWBFormSection5,
    EWBFormSection6,
  },
  name: 'MyEWBNew',
  data() {
    return {
      ewbValues: {
        role: '',
        fromGstin: '',
        fromTrdName: '',
        fromStateCode: '',
        supplyType: 'O',
        subSupplyType: '',
        docType: '',
        docNo: '',
        docDate: '',
        transactionType: '1',
        toGstin: '',
        toTradeName: '',
        toStateCode: '',
        shipToGSTIN: '',
        shipToTradeName: '',
        actToStateCode: '',
        fromAddr1: '',
        fromAddr2: '',
        fromPlace: '',
        fromPincode: '',
        actFromStateCode: '',
        toAddr1: '',
        toAddr2: '',
        toPlace: '',
        toPincode: '',
        // actToStateCode: '',
        itemList: [],
        transDistance: '',
        transMode: '',
        vehicleType: '',
        vehicleNo: '',
      },
    };
  },
  methods: {
    updateEWBValues(valuesFromSection) {
      console.log(valuesFromSection);
      Object.assign(this.ewbValues, valuesFromSection);
    },
    generateEWB(valueFromLastSection) {
      this.updateEWBValues(valueFromLastSection);
      console.log(this.ewbValues);
    },
    saveEWB(valueFromLastSection) {
      this.updateEWBValues(valueFromLastSection);
      // Todo - API to save the ewbValues for later.
      // Then redirect to the view all page
      this.$router.push('/my-ewb');
    },
  },
};
</script>

<style scoped>
.new-ewb-form {
  box-shadow: 0 0 10px 0 #ddd;
}
</style>
