<template>
  <div class="product-manager">
    <div class="d-flex justify-content-between mb-4">
      <h4>{{ managerTitle }}</h4>
      <button
        class="btn btn-default ws-btn btn-sm"
        v-if="isEditable && !showNewItemForm"
        @click.prevent.stop="addNewItem"
      >
        <font-awesome-icon icon="plus"></font-awesome-icon> Add
      </button>
    </div>

    <div
      :class="{'new-item-form-container mb-4 p-3': true,
      'animate__animated animate__slideInDown': showNewItemForm,
      'animate__animated animate__slideUp': !showNewItemForm}"
      v-if="isEditable && showNewItemForm"
    >
      <h5 class="text-center mb-4">New Item Form</h5>
      <new-item-form
        @cancelNewItem="cancelNewItem"
        @saveNewItem="saveNewItem"
      />
    </div>

    <div class="row mb-4 small summary py-2">
      <p class="col-md-2 col-6 m-0">
        <strong> Taxable Amount: <br/>
          <span class="ml-2"> {{ priceSummary.totalTaxable }} </span>
        </strong>
      </p>
      <p class="col-md-2 col-6 m-0">
        <strong> CGST Amount: <br/>
          <span class="ml-2"> {{ priceSummary.cgstValue }} </span>
        </strong>
      </p>
      <p class="col-md-2 col-6 m-0">
        <strong> SGST Amount: <br/>
          <span class="ml-2"> {{ priceSummary.sgstValue }} </span>
        </strong>
      </p>
      <p class="col-md-2 col-6 m-0">
        <strong> IGST Amount: <br/>
          <span class="ml-2"> {{ priceSummary.igstValue }} </span>
        </strong>
      </p>
      <p class="col-md-2 col-6 m-0">
        <strong> Rounding (+/-): <br/>
          <span class="ml-2"> {{ priceSummary.rounding }} </span>
        </strong>
      </p>
      <p class="col-md-2 col-6 m-0">
        <strong> Total Invoice Value: <br/>
          <span class="ml-2"> {{ priceSummary.totalInvValue }} </span>
        </strong>
      </p>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-dark">
        <thead>
          <tr class="text-center">
            <th> # </th>
            <th> Product Name </th>
            <th> Product Description </th>
            <th> HSN </th>
            <th> Qty </th>
            <th> Unit </th>
            <th> Rate (per Unit) </th>
            <th> Taxable Amount </th>
            <th> Tax (%) </th>
            <th> CessRate (%) </th>
            <th> Cess Non Advol </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="!items.length"
          >
            <td
              colspan="12"
            >
              <p class="text-center"> No Items yet. </p>
            </td>
          </tr>
          <tr
            v-for="(item, index) in items"
            :key="item.id"
          >
            <td>{{ index + 1 }} </td>
            <td>
              {{item.productName}}
            </td>
            <td>
              {{item.productDesc}}
            </td>
            <td>
              {{item.hsnCode}}
            </td>
            <td>
              {{item.quantity}}
            </td>
            <td>
              {{item.qtyUnit}}
            </td>
            <td>
              {{item.price}}
            </td>
            <td>
              {{item.taxableAmount}}
            </td>
            <td>
              <p
                v-if="item.cgstRate>0"
              >{{item.cgstRate}}% + {{item.sgstRate}}%
              </p>
              <p
                v-if="item.igstRate>0"
              > {{item.igstRate}}%
              </p>
            </td>
            <td>
              {{item.cessRate}}
            </td>
            <td>
              {{item.cessNonAdvol}}
            </td>
            <td>
              <div class="text-center" v-if="isEditable && items.length>1">
                <button
                  class="btn btn-danger btn-sm ws-btn-rounded py-0 px-1"
                  title="Remove Item"
                  @click.prevent.stop="deleteItem(index)"
                >
                  <font-awesome-icon icon="minus"></font-awesome-icon>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NewItemForm from './NewItemForm.vue';

export default {
  name: 'ProductManager',
  components: {
    NewItemForm,
  },
  props: {
    itemsList: {
      type: Array,
      required: true,
    },
    managerTitle: {
      type: String,
      default: 'Item Details',
    },
    isEditable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showNewItemForm: false,
      items: [...this.itemsList],
    };
  },
  computed: {
    priceSummary() {
      const items = [...this.items];
      let totalTaxable = 0;
      let cgstValue = 0;
      let sgstValue = 0;
      let igstValue = 0;
      let totalInvValue = 0;
      let rounding = '(+)0.00';

      for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        const taxableAmount = parseFloat(currentItem.taxableAmount);
        const cgstRate = parseFloat(currentItem.cgstRate);
        const sgstRate = parseFloat(currentItem.sgstRate);
        const igstRate = parseFloat(currentItem.igstRate);
        totalTaxable += taxableAmount;

        // eslint-disable-next-line max-len
        cgstValue = (parseFloat(cgstValue) + (cgstRate / 100) * taxableAmount).toFixed(2);
        // eslint-disable-next-line max-len
        sgstValue = (parseFloat(sgstValue) + (sgstRate / 100) * taxableAmount).toFixed(2);
        // eslint-disable-next-line max-len
        igstValue = (parseFloat(igstValue) + (igstRate / 100) * taxableAmount).toFixed(2);
      }

      // eslint-disable-next-line max-len
      totalInvValue = parseFloat(totalTaxable) + parseFloat(cgstValue) + parseFloat(sgstValue) + parseFloat(igstValue);
      rounding = Math.round(totalInvValue) - totalInvValue;
      if (rounding > 0) {
        rounding = `(+)${(rounding).toFixed(2)}`;
      } else {
        rounding = rounding.toFixed(2);
      }

      return {
        totalTaxable: totalTaxable.toFixed(2),
        cgstValue: cgstValue,
        sgstValue: sgstValue,
        igstValue: igstValue,
        totalInvValue: Math.round(totalInvValue),
        rounding,
      };
    },
  },
  methods: {
    addNewItem() {
      this.showNewItemForm = true;
    },
    cancelNewItem() {
      this.showNewItemForm = false;
    },
    saveNewItem(item) {
      this.items.push(item);
      this.showNewItemForm = false;
      // Send all the items to the parent component, if any.
      this.$emit('listUpdated', this.items);
    },
    deleteItem(idx) {
      this.items.splice(idx, 1);
      // Send all the items to the parent component, if any.
      this.$emit('listUpdated', this.items);
    },
  },
};
</script>

<style scoped>
.new-item-form-container {
  background-color: #eee;
}

.summary {
  background-color: #ccc;
}
</style>
