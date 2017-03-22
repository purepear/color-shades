<template lang="pug">
#app
  .left-panel(v-if="isValidColor")
    h2 Base color
    .color-format(v-for="f in formats", @click="copyToClipboard(baseColor, f)")
      span {{ formatColor(baseColor, f) }}
      small copy
  .right-panel(v-if="selectedColor")
    h2 Selected color
    .color-format(v-for="f in formats", @click="copyToClipboard(selectedColor, f)")
      small copy
      span {{ formatColor(selectedColor, f) }}

  .color-input
    input(
      type="text",
      placeholder="Enter color",
      v-model="colorString",
      :class="{invalid: !isValidColor}",
      @click="$event.target.select()"
      )
    button(@click="generateRandom") Random

  colors(
    :base-index="baseIndex",
    :colors="allColors",
    @select="onSelectColor",
    @hover="hoverColor = $event"
    )
  comparator(
    v-show="hoverColor",
    :base-color="baseColor",
    :hover-color="hoverColor"
    )
  copy-message(
    v-if="copyText",
    :color="copyColor",
    :text="copyText"
    )

  .copyright This is a Vue2 clone of <a href="http://www.0to255.com">www.0to255.com</a>
  .github <a href="https://github.com/purepear/color-shades">Github</a>
</template>

<script>
import tc from 'tinycolor2'
import copy from 'copy-to-clipboard'
import Colors from './components/Colors.vue'
import Comparator from './components/Comparator.vue'
import CopyMessage from './components/CopyMessage.vue'
import Favicon from './favicon'

const urlpath = window.location.pathname.replace('/', '')
const defaultColor = urlpath && tc(urlpath).isValid() ? tc(urlpath) : tc.random()
const favicon = new Favicon()

export default {
  name: 'app',
  data () {
    return {
      colorString: defaultColor.toHexString(),
      selectedColor: null,
      hoverColor: null,
      copyColor: null,
      percent: 3.333,
      formats: ['Hex', 'Rgb', 'PercentageRgb', 'Hsl', 'Hsv'],
      format: 'Hex',
      copyText: ''
    }
  },
  computed: {
    baseColor () {
      const c = tc(this.colorString)
      if (c.isValid()) {
        try {
          window.history.pushState(0, 0, c.toHex())
        } catch (err) {

        }
      }
      return c
    },
    lightColors () {
      const arr = []
      const c = this.baseColor.clone()
      while(c.toHexString() != '#ffffff') {
        c.lighten(this.percent)
        arr.unshift(c.clone())
      }
      return arr
    },
    darkColors () {
      const arr = []
      const c = this.baseColor.clone()
      while(c.toHexString() != '#000000'){
        c.lighten(-this.percent)
        arr.push(c.clone())
      }
      return arr
    },
    allColors () {
      const colors = [...this.lightColors, this.baseColor, ...this.darkColors]
      favicon.update(colors)
      return colors
    },
    baseIndex () {
      return this.lightColors.length
    },
    isValidColor () {
      return this.baseColor.isValid()
    },
  },
  methods: {
    onSelectColor (color) {
      this.selectedColor = color
      this.copyToClipboard(this.selectedColor, this.format)
    },
    formatColor(color, format) {
      return color['to' + format + 'String']()
    },
    copyToClipboard (color, format) {
      this.copyColor = color
      this.copyText = this.formatColor(this.copyColor, format)
      clearTimeout(this.copyMessageTimeout)
      this.copyMessageTimeout = setTimeout(() => {
        this.copyText = ''
      }, 2000)
      copy(this.copyText)
    },
    generateRandom () {
      this.colorString = tc.random().toHexString()
      this.selectedColor = null
      this.hoverColor = null
      this.copyColor = null
    }
  },
  components: {
    Colors,
    Comparator,
    CopyMessage
  }
}
</script>

<style lang="stylus">
html
  font-size: 62.5%;
body
  color #606c76
  font-family 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif
  font-size 1.6rem // Currently ems cause chrome bug misinterpreting rems on body element
  font-weight 300
  letter-spacing .01em
  line-height 1.6

  background linear-gradient(to right, black 0%, black 50%, #000000 50%, white 50%, white 100%)
  padding 0
  margin 0

a
  color #999

input[type="text"]
  appearance none // Removes awkward default styles on some inputs for iOS
  background-color #fff
  border .1rem solid #ccc
  border-radius .4rem
  box-shadow none
  height 2rem
  padding .6rem 1.0rem // The .6rem vertically centers text on FF, ignored by Webkit
  width 100%
  font-size 1.4rem

  &:focus
    border-color: $color-primary
    outline: 0
  &.invalid
    background-color #f00000

.cf
  &:after
    clear both
    content ' ' // The space content is one way to avoid an Opera bug.
    display table

.left-panel
  position fixed
  top 20px
  left 20px
  color #888
.right-panel
  position fixed
  top 20px
  right 20px
  color #888
  text-align right
.color-input
  position fixed
  top 50%
  left 30px
  input
    width 130px
  button
    cursor pointer
    background-color #fff
    border .1rem solid #ccc
    border-radius .4rem
    box-shadow none
    height 3.4rem
    padding .6rem 1.0rem // The .6rem vertically centers text on FF, ignored by Webkit
    font-size 1.4rem
    margin-left 1rem

.copyright
  position fixed
  bottom 10px
  left 20px
.github
  position fixed
  bottom 10px
  right 20px
h2
  margin 0
.color-format
  padding 5px 10px
  cursor pointer
  width 250px
  border-left 1px solid transparent
  small
    display none
    margin 0 10px
  &:hover
    // border-left 1px solid #888
    // padding-left 15px
    small
      display inline

.fade-enter-active, .fade-leave-active
  transition opacity .5s
.fade-enter, .fade-leave-to
  opacity 0
</style>
