import snake from "./snake.js"
import { balls } from "./snake.js"
import getRandomInt from "./randomInt.js"



class GameBoard {
    constructor(snake, balls) {
        this.ctx = document.querySelector("canvas").getContext("2d")
        this.snake = snake
        this.balls = balls
        this.XgameSpeed = 0
        this.YgameSpeed = 0
        this.maxSpeed = 10
    }
    clearScreen = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
    createBall = () => {
        let mainBall = balls.mainBall
        this.ctx.beginPath()
        this.ctx.arc(mainBall.x, mainBall.y, mainBall.r, mainBall.s, mainBall.e)
        this.ctx.fillStyle = "red"
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath()
    }

    showSnake = () => {
        this.snake.body.map(body => {
            this.ctx.beginPath()
            this.ctx.rect(body.x, body.y, 10, 10)
            this.ctx.fillStyle = "green"
            this.ctx.stroke()
            this.ctx.fill()
            this.ctx.closePath()
        })
    }
    move = () => {
        const { body } = this.snake
        const head = { x: body[0].x + this.XgameSpeed, y: body[0].y + this.YgameSpeed };
        body.unshift(head)
        body.pop();
    }
    stopOrMove = () => {
        for (let i = 0; i < snake.body.length; i++) {
            let { x, y } = snake.body[i]
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
    hitBall = () => {
        const topLeftBall = { x: this.balls.mainBall.x, y: this.balls.mainBall.y }
        const topRightBall = { x: this.balls.mainBall.x + 10, Y: this.balls.mainBall.y }
        const bottomLeftBall = { x: this.balls.mainBall.x, y: this.balls.mainBall.y + 10 }
        const bottomRighBall = { x: this.balls.mainBall.x + 10, y: this.balls.mainBall.x + 10 }

        const checkPoints = [topLeftBall, topRightBall, bottomLeftBall, bottomRighBall]

        checkPoints.map(item => {

        })
        // check which wall is being hit. 

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
        setTimeout(() => {
            this.clearScreen()
            this.stopOrMove()
            this.hitBall()
            this.changeDirection()
            this.showSnake()
            this.createBall()
            this.runGame();
        }, 100)
    }
    static start = (snake, balls) => {
        new GameBoard(snake, balls).runGame()
    }
}

GameBoard.start(snake, balls)