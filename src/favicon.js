export default class {
  constructor (size = 64, stripesNum = 4) {
    this.size = size
    this.stripesNum = stripesNum

    this.link = document.createElement('link')
    this.link.rel = 'shortcut icon'
    this.link.type = 'image/x-icon'
    document.head.appendChild(this.link)

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.size
    this.canvas.height = this.size
  }
  update (colors) {
    const ctx = this.canvas.getContext('2d')
    const step = Math.floor(colors.length / (this.stripesNum + 2))
    const stripeHeight = Math.floor(this.size / this.stripesNum)

    for (let i = 0; i < this.stripesNum; i++) {
      ctx.fillStyle = colors[step + step * i].toRgbString()
      ctx.fillRect(0, i * stripeHeight, this.size, stripeHeight)
    }

    this.link.href = this.canvas.toDataURL('image/x-icon')
  }
}
