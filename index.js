import snake from "./snake.js"



class GameBoard {
    constructor(snake) {
        this.ctx = document.querySelector("canvas").getContext("2d")
        this.snake = snake
        this.XgameSpeed = 10
        this.YgameSpeed = 0
        this.maxSpeed = 5
    }
    clearScreen = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
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
    changeDirection = () => {

    }
    runGame = () => {
        setTimeout(() => {
            this.clearScreen()
            this.move()
            this.showSnake()
            this.runGame();
        }, 100)
    }
    static start = (snake) => {
        new GameBoard(snake).runGame()
    }
}

GameBoard.start(snake)