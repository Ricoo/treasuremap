class Adventurer {
    constructor(name, pos_x, pos_y, rot, sequence) {
        this.name = name
        this.x = pos_x
        this.y = pos_y
        this.rotation = rot
        this.seq = sequence
        this.treasures = 0
        this.isActive = true
        this.moved = false
    }

    addTreasure() {
        this.treasures++
    }

    doStep(map) {
        const rotCycle = {
            'N': {
                'G': 'O',
                'D': 'E',
                'move': [0, -1]
            },
            'E': {
                'G': 'N',
                'D': 'S',
                'move': [1, 0]
            },
            'S': {
                'G': 'E',
                'D': 'O',
                'move': [0, 1]
            },
            'O': {
                'G': 'S',
                'D': 'N',
                'move': [-1, 0]
            }
        }
        // action = sequence.shift()
        let action = this.seq.charAt(0)
        this.seq = this.seq.substr(1)
        if (this.seq.length <= 0) {
            this.isActive = false
            // return [this.x, this.y]
        }
        this.moved = false
        switch (action) {
            case 'A':
                let [x, y] = rotCycle[this.rotation]['move']
                if (map.canMove([this.x + x, this.y + y])) {
                    this.moved = true
                    this.x = this.x + x
                    this.y = this.y + y
                }
                break
            case 'D':
                this.rotation = rotCycle[this.rotation]['D']
                break
            case 'G':
                this.rotation = rotCycle[this.rotation]['G']
                break
            default:
                throw Error("Invalid action: " + action)
        }
        return [this.x, this.y]
    }
}

export {Adventurer}