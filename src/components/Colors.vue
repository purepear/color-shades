<template lang="pug">
.colors(@mouseleave="$emit('hover', false)")
  .color(
    v-for="(c, i) in colors",
    :style="{backgroundColor: c}",
    :class="{baseColor: baseIndex === i, light: c.isLight()}",
    @click="$emit('select', c)",
    @mouseenter="$emit('hover', c)"
    )
    span.distance {{ distance(i) }}
    span.hex {{ c.toHexString() }}
    span.lightness {{ lightness(i) }}%
</template>

<script>
export default {
  name: 'colors',
  props: ['baseIndex', 'colors'],
  computed: {

  },
  methods: {
    distance (i) {
      return (this.baseIndex - i > 0 ? '+' : '') + (this.baseIndex - i)
    },
    lightness (i) {
      return 100 - Math.round(100 / (this.colors.length - 1) * i)
    }
  }
}
</script>

<style lang="stylus">
.colors
  position relative
  width 33%
  margin 0 auto
.color
  margin 0 8px
  height 25px
  padding 10px 10px
  text-align center
  z-index 1
  position relative
  color #fff
  border 1px solid transparent
  cursor pointer
  font-size 1.4rem
  .distance, .lightness
    position absolute
    display none
    top 10px
  .distance
    left 10px
  .lightness
    right 10px
  &.light
    color #000
  &:hover
    z-index 2
    margin 0 3px
    box-shadow 0 0 10px rgba(0, 0, 0, 0.3)
    border-top-color rgba(255, 255, 255, 0.4)
    border-right-color rgba(0, 0, 0, 0.125)
    border-bottom-color rgba(0, 0, 0, 0.25)
    border-left-color rgba(255, 255, 255, 0.2)
    .hex
      font-weight bold
    .distance, .lightness
      display block
  &.baseColor
    z-index 3
    margin 0
    font-weight bold
    border-top-color rgba(255, 255, 255, 0.4)
    border-right-color rgba(0, 0, 0, 0.125)
    border-bottom-color rgba(0, 0, 0, 0.25)
    border-left-color rgba(255, 255, 255, 0.2)
</style>
