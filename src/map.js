import { Adventurer } from "./adventurer.js"

class MapBuilder {
    constructor() {
        this.map = null
        this.advlist = []
    }

    defineSize(size) {
        [this.x, this.y] = size.map(Number)
        this.map = Array.from(Array(Number(this.x)), () => new Array(Number(this.y)))
        this.map.forEach((el) => el.fill(" "))
    }

    addMountain(arg) {
        let [x, y] = arg.map(Number)
        this.map[x][y] = 'M'
    }

    addTreasures(arg) {
        let [x, y, amount] = arg.map(Number)
        console.log(this.map)
        this.map[x][y] = Number(amount)
    }

    addAdventurer(arg) {
        let [advname, x, y, rot, sequence] = arg
        this.advlist.push(new Adventurer(advname, Number(x), Number(y), rot, sequence))
    }

    doSteps() {
        while (this.advlist.find((adv) => adv.isActive)) {
            this.advlist.forEach((adv)=>{
                let [x, y] = adv.doStep(this)
                if (typeof this.map[x][y] == 'number' &&
                    this.map[x][y] > 0) {
                    adv.addTreasure()
                    this.map[x][y]
                }
            })    
        }
    }

    canMove(pos) {
        let [x, y] = pos
        if (x < 0 || x > this.x ||
            y < 0 || y > this.y ||
            this.map[x][y] == 'M') {
            return false
        }
        return true
    }

    serialize() {
        let res = []
        res.push(`C - ${this.x} - ${this.y}`)
        this.map.forEach((el, x) => {
            el.forEach((el, y) => {
                if (typeof el == "number") {
                    res.push(`T - ${this.x} - ${this.y} - ${el}`)
                }
                if (el == 'M') {
                    res.push(`M - ${this.x} - ${this.y}`)
                }
            })
        });
        this.advlist.forEach((a) => {
            res.push(`A - ${a.name} - ${a.x} - ${a.y} - ${a.rotation} - ${a.treasures}`)
        })
        console.log(res.join('\n'))
        return res.join('\n')
    }
}

export {MapBuilder}