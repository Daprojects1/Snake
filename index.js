import snake from "./snake.js"
import balls from "./ball.js"
import getRandomInt from "./randomInt.js"
import toggleValue from "./toggle.js"



class GameBoard {
    constructor() {
        this.ctx = document.querySelector("canvas").getContext("2d")
        this.snake = snake
        this.balls = balls
        this.XgameSpeed = 0
        this.YgameSpeed = 0
        this.maxSpeed = 10
        this.ballEaten = false
        this.gameStarted = 0;
        this.randomBallPos = {x:30,y:30}
    }
    clearScreen = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
    move = () => {
        const { body } = this.snake
        const head = { x: body[0].x + this.XgameSpeed, y: body[0].y + this.YgameSpeed };
        body.unshift(head)
        body.pop();
    }
    createRandomInt = () => {
        let size = 10;
        if (!this.gameStarted || this.ballEaten) {        
            const x = getRandomInt(snake.body[0].x + size, this.ctx.canvas.width-size)
            const y = getRandomInt(snake.body[0].y + size, this.ctx.canvas.height-size)
            this.randomBallPos.x = x
            this.randomBallPos.y =y
        }
    }
    stopOrMove = () => {
        for (let i = 0; i < this.snake.body.length; i++) {
            let { x, y } = this.snake.body[i]
            let leftWall = x <= 0
            let topWall = y <= 0
            let rightWall = x >= (this.ctx.canvas.width - 10)
            let bottomWall = y >= (this.ctx.canvas.height - 10)
            if (leftWall || topWall || rightWall || bottomWall) {
                this.XgameSpeed = 0
                this.YgameSpeed = 0
                this.maxSpeed = 0
                return null
            }
        }
        return this.move()
    }
    canCreateBall = () => {
        if (this.ballEaten) {
            setTimeout(() => {
                this.toggleBallEaten(false)
            }, 500)
        } else {
            this.balls.createBall(this.ctx, this.randomBallPos)
        }
    }
    toggleBallEaten = (bool) => {
        if (typeof bool === "boolean")
        this.ballEaten = bool
    }
    changeDirection = () => {
        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowRight":
                    if (this.XgameSpeed === 0) {
                        this.YgameSpeed = 0
                        this.XgameSpeed = this.maxSpeed
                    }
                    break;
                case "ArrowLeft":
                    if (this.XgameSpeed === 0) {
                        this.YgameSpeed = 0
                        this.XgameSpeed = -this.maxSpeed
                    }
                    break;
                case "ArrowUp":
                    if (this.YgameSpeed === 0) {
                        this.XgameSpeed = 0
                        this.YgameSpeed = -this.maxSpeed
                    }
                    break;
                case "ArrowDown":
                    if (this.YgameSpeed === 0) {
                        this.XgameSpeed = 0
                        this.YgameSpeed = this.maxSpeed
                    }
                    break;
                default:
                    break;
            }
        }, { once: true })
    }
    runGame = () => {
        const { canCreateBall, hitBall } = this.balls
        const { showSnake } = this.snake
        setTimeout(() => {
            this.clearScreen()
            showSnake(this.ctx)
            this.stopOrMove()
            this.changeDirection()
            this.createRandomInt()
            this.canCreateBall()
            hitBall(this.snake, this.toggleBallEaten)
            this.gameStarted=1
            this.runGame();
        }, 100)
    }
    static start = () => {
        new GameBoard().runGame()
    }
}

GameBoard.start()