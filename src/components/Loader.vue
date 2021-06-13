<template>
  <div class="loader">
    <div class="loader-info">
      <div class="spinner">
      </div>
      <p class="mt-3 text-center loader-text"> {{ text }}... </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    text: {
      type: String,
      default: 'Loading',
    },
  },
};
</script>

<style scoped>
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 999;
  }

  .loader-info {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #000;
  }

  .spinner {
    box-shadow: 1px 2px 1px 0px #000;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin: auto;
    animation-name: "App-logo-spin";
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  .loader-text {
    color: #fff;
    text-shadow: 1px 1px 1px #000;
  }
</style>
