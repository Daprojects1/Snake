class Balls {
    constructor() {
        this.mainBall = { x: 200, y: 80, r: 10, s: 0, e: 2 * Math.PI }
        this.bonusBall = { x: 20, y: 20, r: 7, s: 0, e: 2 * Math.PI }
    }
    createBall = (ctx, ballPos) => {
        this.mainBall.x = ballPos.x
        this.mainBall.y = ballPos.y
        ctx.beginPath()
        ctx.arc(this.mainBall.x, this.mainBall.y, this.mainBall.r, this.mainBall.s, this.mainBall.e)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
    hitBall = (snake, toggleBallEaten) => {
        const {body } = snake
        const width = 10

        const leftOrRight = body[0].x >= this.mainBall.x-width && body[0].x <= this.mainBall.x + width
        const topOrBottom = body[0].y >= this.mainBall.y-width && body[0].y <= this.mainBall.y + width
        
        if (leftOrRight && topOrBottom) toggleBallEaten(true)
        // check which wall is being hit. 
    }
    
}


const balls = new Balls()

export default balls