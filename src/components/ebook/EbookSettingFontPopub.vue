<template>
  <transition name="popub-slide-up">
    <div class="ebook-popub-list" v-show="fontFamilyVisible">
    <div class="ebbok-popub-title">
      <div class="ebbok-popub-title-icon" @click="hide">
        <span class="icon-down2"></span>
      </div>
      <span class="ebook-popub-title-text">选择字体</span>
    </div>
    <div class="ebbok-popub-list-wrapper">
      <div class="ebook-popub-item" v-for="(item, index) in fontFalilyList" :key="index" @click="setFontFamily(item.font)">
        <div class="ebbok-popub-item-text" :class="{'selected': isSelect(item)}">{{item.font}}</div>
        <div class="ebook-popub-item-check" v-if="isSelect(item)">
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
import { ebookMixin } from '../../utils/mixin.js'
import { FONT_FAMILY } from '../../utils/book.js'
import { saveFontFamily } from '../../utils/localStorage.js'

export default {
  name: 'EbookSettingFontPopub',
  data () {
    return {
      fontFalilyList: FONT_FAMILY
    }
  },
  mixins: [ebookMixin],
  methods: {
    setFontFamily (font) {
      this.setDefaultFontFamily(font)
      saveFontFamily(this.fileName, font)
      if (font === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
          this.currentBook.rendition.themes.font(font)
      }
    },
    isSelect (item) {
      return this.defaultFontFamily === item.font
    },
    hide () {
      this.setFontFamilyVisible(false)
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' scoped>
  @import '../../assets/styles/global.scss';
  .ebook-popub-list{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 300;
    background: #fff;
    width: 100%;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);
    .ebbok-popub-title{
      position: relative;
      padding: px2rem(15);
      text-align: center;
      border-bottom: px2rem(1) solid #b8b9bb;
      box-sizing: border-box;
      @include center;
      .ebbok-popub-title-icon{
        position: absolute;
        left: px2rem(15);
        top: 0;
        height: 100%;
        font-size: px2rem(16);
        font-weight: bold;
        @include center;
      }
      .ebook-popub-title-text{
        font-size: px2rem(14);
        font-weight: bold;
      }
    }
    .ebbok-popub-list-wrapper{
      .ebook-popub-item{
        display: flex;
        padding: px2rem(15);
        .ebbok-popub-item-text{
          flex: 1;
          font-size: px2rem(14);
          text-align: left;
          &.selected {
            color: #346cb9;
            font-weight: bold;
          }
        }
        .ebook-popub-item-check{
          flex: 1;
          font-size: px2rem(14);
          text-align: right;
          color: #346cb9;
          .icon-check{
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
