<template>
  <div
    :class="{
      [`alert fade show ${this.alertType}`]: true,
      'alert-dismissible': this.dismissible
    }"
    role="alert"
  >
    <ol
      class="m-0"
      v-if="bullets.length"
    >
      <li
        v-for="(msg,index) in bullets"
        :key="index"
      >
        {{msg}}
      </li>
    </ol>
    <p
      v-if="!bullets.length && message"
      class="m-0"
    >
      {{ message }}
    </p>
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Dismiss Notification"
      v-if="dismissible"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
const alertTypes = {
  error: 'alert-danger',
  warning: 'alert-warning',
  info: 'alert-info',
  success: 'alert-success',
  default: 'alert-primary',
};

export default {
  name: 'Alerts',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    bullets: {
      type: Array,
    },
    message: {
      type: String,
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    alertType() {
      return alertTypes[this.type];
    },
  },
};
</script>
