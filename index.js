import snake from "./snake.js"
import balls from "./ball.js"
import getRandomInt from "./randomInt.js"

const scoreSpan = document.querySelector(".score-span")
const highScore = document.querySelector(".high-score")

const getHighScore = () => {
    const score = localStorage.getItem("highScore") || 0
    return score
}

highScore.innerHTML = getHighScore()

class GameBoard {
    constructor() {
        this.ctx = document.querySelector("canvas").getContext("2d")
        this.snake = snake
        this.balls = balls
        this.XgameSpeed = 0
        this.YgameSpeed = 0
        this.maxSpeed = 10
        this.ballEaten = false
        this.randomBallPos = { x: 30, y: 30 }
        this.currentBall = 0
        this.gameStarted = 0;
        this.gameStopped = false
        this.score = 0
    }
    clearScreen = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
    move = () => {
        if (!this.gameStopped) {     
            const { body } = this.snake
            const head = { x: body[0].x + this.XgameSpeed, y: body[0].y + this.YgameSpeed };
            body.unshift(head)
            body.pop();
        }
    }
    createRandomInt = () => {
        let size = 10;
        if (!this.gameStarted || this.ballEaten) {        
            const x = getRandomInt(0 + size, this.ctx.canvas.width-size)
            const y = getRandomInt(0 + size, this.ctx.canvas.height-size)
            this.randomBallPos.x = x
            this.randomBallPos.y =y
        }
    }
    stopGame = () => {
        this.XgameSpeed = 0
        this.YgameSpeed = 0
        this.maxSpeed = 0
        this.gameStopped = true;
        setTimeout(() => {
            this.endGameModal()
        },500)
    }
    stopOrMove = () => {
        for (let i = 0; i < this.snake.body.length; i++) {
            let { x, y } = this.snake.body[i]
            let leftWall = x <= 0
            let topWall = y <= 0
            let rightWall = x >= (this.ctx.canvas.width - 10)
            let bottomWall = y >= (this.ctx.canvas.height - 10)
            if (leftWall || topWall || rightWall || bottomWall) {
                this.stopGame()
                return null
            }
        }
        const { body } = this.snake
        const {x,y} = body[0]
        for (let i = 1; i < body.length; i++){
            if (this.score && x === body[i].x && y === body[i].y) {
                this.stopGame()   
            }
        }
        return this.move()
    }
    pushSnake = (num) => {
        for (let i = 0; i < num; i++){
            const { body } = this.snake
            let i = body.length-1
            const tail = { x: body[i].x, y: body[i].y }
            body.push(tail)
        }
        if (this.currentBall === 0)
        this.changeScore(2)
        else this.changeScore(4)
    }
    changeScore = (val)=> {
        this.score += val
        scoreSpan.innerHTML = this.score
        if (this.score > getHighScore()) {
            localStorage.setItem("highScore", this.score)
        }
        highScore.innerHTML = getHighScore()
    }
    canCreateBall = () => {
        const bonusBallCheck = this.score > 1 && this.score % 10 === 0
        if (this.ballEaten) {
            setTimeout(() => {
                this.toggleBallEaten(false)
            }, 100)
           if (bonusBallCheck)
               this.pushSnake(2)
            else this.pushSnake(1)
            return
        } else {
            let mainBall = { ball: this.balls.mainBall, color: "red" }
            let bonusBall = { ball: this.balls.bonusBall, color: "purple" }
            if (bonusBallCheck) {
                 this.currentBall = 1
                this.balls.createBall(this.ctx, this.randomBallPos, bonusBall)
            } else {
                this.currentBall = 0
                this.balls.createBall(this.ctx,this.randomBallPos,mainBall)
            }
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
    endGameModal = () => {
        const body = document.querySelector("body")
        const mainDiv = document.querySelector(".main-div")
        const modal = document.createElement("div")
        const btn = document.createElement("button")
        btn.innerText = "Restart"
        btn.addEventListener("click", ()=> location.reload())
        mainDiv.innerHTML=""
        modal.classList.add("modal")
        modal.appendChild(btn)
        body.appendChild(modal)        
    }
    snakeMovementLogic = () => {
        this.snake.showSnake(this.ctx)        
        this.stopOrMove()
        this.changeDirection()
    }
    ballMovementLogic = () => {
        this.createRandomInt()
        this.canCreateBall()
        this.balls.hitBall(this.snake, this.toggleBallEaten)
    }
    runGame = () => {
        setTimeout(() => {
            this.gameStarted = 1
            this.clearScreen()
            this.snakeMovementLogic()
            this.ballMovementLogic()
            if (!this.gameStopped) {
                this.runGame();
            }
        }, 100)
    }
    static start = () => {
        new GameBoard().runGame()
    }
}

GameBoard.start()