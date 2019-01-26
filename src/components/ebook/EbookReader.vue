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
      const url = '/ebook/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
      this.rendition.on('click', event => {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
      })
      // this.rendition.on('touchend', event => {
      //   const offsetX = event.changeTouches[0].clientX - this.touchStartX
      //   const time = event.timeStamp - this.touchStartTime
      //   console.log(123)
      // })
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
