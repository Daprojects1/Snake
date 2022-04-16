class Balls {
    constructor() {
        this.mainBall = { x: 200, y: 80, r: 10, s: 0, e: 2 * Math.PI }
        this.bonusBall = { x: 250, y: 80, r: 25, s: 0, e: 2 * Math.PI }
        this.currentBall =null
    }
    createBall = (ctx, ballPos, ballType) => {
        ballType.ball.x = ballPos.x
        ballType.ball.y = ballPos.y
        ctx.beginPath()
        ctx.arc(ballType.ball.x, ballType.ball.y, ballType.ball.r, ballType.ball.s, ballType.ball.e)
        ctx.fillStyle = ballType.color
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        this.currentBall = ballType.ball
    }

    hitBall = (snake, toggleBallEaten) => {
        const {body } = snake
        const width = this.currentBall.r*2
        const leftOrRight = body[0].x >= this.currentBall.x-width && body[0].x <= this.currentBall.x + width/2
        const topOrBottom = body[0].y >= this.currentBall.y-width && body[0].y <= this.currentBall.y + width/2
        if (leftOrRight && topOrBottom) toggleBallEaten(true)
        // check which wall is being hit. 
    }
    
}


const balls = new Balls()

export default balls