class Snake {
    constructor() {
        this.body = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }, { x: 170, y: 200 }]
    }
    showSnake = (ctx) => {
        this.body.map(body => {
            ctx.beginPath()
            ctx.rect(body.x, body.y, 10, 10)
            ctx.fillStyle = "green"
            ctx.stroke()
            ctx.fill()
            ctx.closePath()
        })
    }
}



const snake = new Snake()

export default snake

