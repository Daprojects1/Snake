class Snake {
    constructor() {
        this.body = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }, { x: 170, y: 200 }]
    }

}


class Balls {
    constructor() {
        this.mainBall = { x: 200, y: 80, r: 10, s: 0, e: 2 * Math.PI }
        this.bonusBall = { x: 20, y: 20, r: 7, s: 0, e: 2 * Math.PI }
    }
}
const snake = new Snake()
const balls = new Balls()

export { balls }
export default snake

