<template lang="pug">
.comparator
  span Click to copy
  div(:style="{backgroundColor: hoverColorString, borderRadius: '7px 7px 0 0'}")
  div(:style="{backgroundColor: baseColorString, borderRadius: '0 0 7px 7px'}")
</template>

<script>
export default {
  name: 'comparator',
  props: ['baseColor', 'hoverColor'],
  computed: {
    hoverColorString() { return this.hoverColor ? this.hoverColor.toHexString() : '#000'},
    baseColorString() { return this.baseColor ? this.baseColor.toHexString() : '#000'}
  },
  methods: {
    mouseMove (e) {
      this.$el.style.left = (e.clientX + 15) + 'px'
      this.$el.style.top = (e.clientY + 20) + 'px'
    }
  },
  mounted () {
    document.addEventListener('mousemove', this.mouseMove, false)
  },
  destroyed () {
    document.removeEventListener('mousemove', this.mouseMove, false)
  }
}
</script>

<style lang="stylus">
.comparator
  z-index 2000
  position fixed
  top -200px
  left -200px
  padding 0 7px 7px 7px
  background rgba(0, 0, 0, 0.7)
  border-radius 7px
  color #fff
  font-size 1rem
  width 70px
  div
    display block
    height 30px
</style>