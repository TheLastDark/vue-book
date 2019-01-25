<template>
  <div class="ebbok-reader">
    {{$route.params.fileName}}
  </div>
</template>
<script>
export default {
  name: 'EbookReader',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
  @import '../../assets/styles/global';
</style>
