<template lang="pug">
transition(name="fade")
  .copy-message(:style="{backgroundColor: color.toHexString(), color: color.isLight() ? '#000' : '#fff'}")
    span Copied
    strong {{ text }}
</template>

<script>
export default {
  name: 'copy-message',
  props: ['color', 'text']
}
</script>

<style lang="stylus">
.copy-message
  position fixed
  top 0
  right 0
  z-index 100
  padding 0.4em
  box-shadow 0 0 10px rgba(0,0,0,0.175)
  border-bottom 1px solid rgba(0,0,0,0.1)
  border-left 1px solid rgba(0,0,0,0.1)
  font-size 1rem
  strong
    margin-left 10px
    font-weight bold
</style>