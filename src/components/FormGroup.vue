<template>
  <div class="ws-form-group">
    <!-- Tenplate for normal input fields with varied types -->
    <div class="form-group" v-if="formElem.element === 'input'">
      <label
        :for="formElem.id"
      > {{ formElem.label }} </label>
      <input
        :type="formElem.type"
        class="form-control"
        :id="formElem.id"
        :placeholder="formElem.placeholder"
        v-model="formElem.value"
        :disabled="formElem.disabled"
        :required="formElem.required"
        autocomplete="off"
      />
    </div>

    <!-- Template for special input fields with icons appended/prepended -->
    <div class="form-group" v-if="formElem.element === 'inputGrp'">
      <label
        :for="formElem.id"
      > {{ formElem.label }} </label>
      <div class="input-group">
        <input
          :type="formElem.type"
          class="form-control"
          :id="formElem.id"
          :placeholder="formElem.placeholder"
          :readonly="formElem.readOnly"
          v-model="formElem.value"
          :disabled="formElem.disabled"
          :aria-label="formElem.placeholder"
          :required="formElem.required"
          autocomplete="off"
        />
        <div class="input-group-append">
          <!-- Append this button only for passwords -->
          <button class="btn btn-outline-secondary"
            @click.stop.prevent="togglePasswordView"
            v-if="formElem.grpType === 'password'"
          >
            <font-awesome-icon
              icon="eye"
              v-show="formElem.type==='password'"
            ></font-awesome-icon>
            <font-awesome-icon
              icon="eye-slash"
              v-show="formElem.type==='input'"
            ></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Template for checkbox for normal checkboxes -->
    <div class="form-group form-check" v-if="formElem.element === 'checkbox'">
      <input
        :id="formElem.id"
        type="checkbox"
        class="form-check-input"
        v-model="formElem.value"
      />

      <label
        :for="formElem.id"
        class="form-check-label"
      > {{ formElem.label }} </label>
    </div>

    <!-- Template for inline radio buttons -->
    <div class="form-group" v-if="formElem.element === 'radio'">
      <p
        class="mb-1"
      > {{ formElem.label }} </p>
      <div
        class="custom-control custom-radio custom-control-inline"
        v-for="(option, index) in formElem.options"
        :key="formElem.name+option.value"
      >
        <input
          type="radio"
          :id="formElem.name+index"
          :name="formElem.name"
          :value="option.value"
          v-model="formElem.value"
          :checked="option.value === formElem.value"
          class="custom-control-input"
          :required="formElem.required"
          :disabled="formElem.disabled"
        />
        <label
          class="custom-control-label"
          :for="formElem.name+index"
        > {{ option.text }} </label>
      </div>
    </div>

    <!-- Template for select dropdown -->
    <div class="form-group" v-if="formElem.element === 'select'">
      <p
        class="mb-1"
      > {{ formElem.label }} </p>
      <select
        class="form-control mb-3"
        :value="formElem.value"
        v-model="formElem.value"
        :required="formElem.required"
        :disabled="formElem.disabled"
      >
        <option value="" disabled> Select {{ formElem.label }} </option>
        <option
          v-for="(o, index) in formElem.options"
          :key="o.value+index"
          :value="o.value"
        > {{ o.text }} </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    formElem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    togglePasswordView: function () {
      if (this.formElem.type === 'input') {
        this.formElem.type = 'password';
        return;
      }

      this.formElem.type = 'input';
    },
  },
};
</script>
