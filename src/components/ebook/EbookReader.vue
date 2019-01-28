<template>
  <div class="ebbok-reader">
    <div id="read"></div>
  </div>
</template>
<script>
import Epub from 'epubjs'
import { ebookMixin } from '../../utils/mixin'
global.ePub = Epub
export default {
  name: 'EbookReader',
  data () {
    return {
    }
  },
  mixins: [ebookMixin],
  computed: {
  },
   mounted () {
    this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
      this.initEpub()
      // console.log(this.$route.params.fileName)
    })
  },
  methods: {
  prevPage () {
    if (this.rendition) {
      this.rendition.prev()
      this.hideTitleAndMenu()
    }
  },
  nextPage () {
    if (this.rendition) {
      this.rendition.next()
      this.hideTitleAndMenu()
    }
  },
  toggleTitleAndMenu () {
    this.setMenuVisible('setMenuVisoble', !this.menuVisible)
  },
  hideTitleAndMenu () {
    this.setMenuVisible('setMenuVisoble', false)
  },
  initEpub () {
      const url = '/ebook/epub/' + this.$store.state.book.fileName + '.epub'
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
      this.rendition.on('touchstart', event => {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
          console.log(event)
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changeTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.preventDefault()
        event.stopPropagation()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '../../assets/styles/global';
</style>
