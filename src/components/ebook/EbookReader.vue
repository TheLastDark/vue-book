<template>
  <div class="ebbok-reader">
    <div id="read"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  name: 'EbookReader',
  data () {
    return {
    }
  },
   computed: {
    ...mapGetters(['fileName'])
  },
  methods: {
  initEpub () {
      const url = 'http://192.168.31.128:8080/ebook/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      console.log(this.book)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
    }
  },
  mounted () {
    this.$store.dispatch('setFileName', this.$route.params.fileName.split('|').join('/')).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style lang='scss' scoped>
  @import '../../assets/styles/global';
</style>
