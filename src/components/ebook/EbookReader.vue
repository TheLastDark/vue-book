<template>
  <div class="ebbok-reader">
    <div id="read"></div>
  </div>
</template>
<script>
import Epub from 'epubjs'
import { ebookMixin } from '../../utils/mixin'
import { getFontFamily, saveFontFamily, saveFontSize, getFontSize, getTheme, saveTheme } from '../../utils/localStorage'
global.ePub = Epub
export default {
  name: 'EbookReader',
  mixins: [ebookMixin],
  computed: {
  },
   mounted () {
    this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
      this.initEpub()
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
    if (this.menuVisible) {
    this.setSettingVisible(-1)
    this.setFontFamilyVisible(false)
    }
    this.setMenuVisible(!this.menuVisible)
  },
  hideTitleAndMenu () {
    this.setMenuVisible(false)
    this.setSettingVisible(-1)
    this.setFontFamilyVisible(false)
  },
  initTheme () {
    let defaultTheme = getTheme(this.fileName)
    if (!defaultTheme) {
      defaultTheme = this.themeList[0].name
      saveTheme(this.fileName, defaultTheme)
    }
    this.setDefaultTheme(defaultTheme)
    this.themeList.forEach(theme => {
    this.rendition.themes.register(theme.name, theme.style)
    })
    this.rendition.themes.select(defaultTheme)
  },
  initFontsize () {
     let font = getFontFamily(this.fileName)
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
            this.rendition.themes.font(font)// 没有生效
            this.setDefaultFontFamily(font)
          }
  },
  initFontFamily () {
     let fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize)
        } else {
            this.rendition.themes.fontSize(fontSize)// 没有生效
            this.setDefaultFontSize(fontSize)
          }
  },
  initEpub () {
      const url = `${process.env.VUE_APP_RES_URL}/ebook/epub/${this.fileName}.epub`
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display().then(() => {
        this.initTheme()
        this.initFontsize()
        this.initFontFamily()
        this.initGlobalStyle()
      })
      this.rendition.on('touchstart', event => {
          console.log(event)
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
      }, { passive: true })
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
        // event.preventDefault()
        event.stopPropagation()
      }, { passive: true })
      this.rendition.hooks.content.register(content => {
        Promise.all([
        content.addStylesheet(`${process.env.VUE_APP_RES_URL}/ebook/fonts/cabin.css`),
        content.addStylesheet(`${process.env.VUE_APP_RES_URL}/ebook/fonts/daysOne.css`),
        content.addStylesheet(`${process.env.VUE_APP_RES_URL}/ebook/fonts/montserrat.css`),
        content.addStylesheet(`${process.env.VUE_APP_RES_URL}/ebook/fonts/tangerine.css`)
        ]).then(() => {})
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '../../assets/styles/global';
</style>
