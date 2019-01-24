<template>
  <div id="app">
    <router-view></router-view>
    <div class="text">123</div>
  </div>
</template>
<script>
export default {
  mounted () {
    this.$store.dispatch('setTest', 10)
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  html.style.fontSize = fontSize + 'px'
})
</script>
<style lang="scss" scoped>
  @import './assets/styles/global';
  .text {
    font-size: px2rem(20);
    color: red;
  }
</style>
