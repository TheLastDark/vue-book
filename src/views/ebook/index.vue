<template>
  <div>
    <div class="ebook">
      <ebook-title></ebook-title>
      <ebook-reader></ebook-reader>
      <ebook-menu></ebook-menu>
    </div>
  </div>
</template>
<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTilte'
import EbookMenu from '../../components/ebook/EbookMenu'
export default {
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  }
}
</script>

<style lang='scss' scoped>

</style>
