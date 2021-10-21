import { MapBuilder } from "./map.js"

class FileParser {

    constructor() {
        this.file = null
        this.descstring = []
    }

    getFile(f) {
        return new Promise((resolve, reject) => {
            if (!f) {
                reject("No file provided")
            }
            let reader = new FileReader()

            reader.addEventListener('load',  () => {
                this.descstring = reader.result.toString().split(/\r?\n/)

                resolve()
            })

            reader.addEventListener('error', () => {
                reject("Error while reading file")
            })

            reader.readAsText(f)
        })
    }

    parseInput() {
         return new Promise((resolve, reject) => {
            let map = new MapBuilder()
            try {
                this.descstring = this.descstring.reduce((acc, el) => {
                    if (el[0] == 'C') {
                        return [el, ...acc]
                    }
                    return [...acc, el]
                }, [])
                this.descstring.forEach((el) => {
                    let tmp = el.split(' - ')
                    let arg = tmp.slice(1, tmp.length)
                    switch (el[0]) {
                        case 'C':
                            map.defineSize(arg)
                            break
                        case 'M':
                            map.addMountain(arg)
                            break
                        case 'T':
                            map.addTreasures(arg)
                            break
                        case 'A':
                            map.addAdventurer(arg)
                            break
                        case '#':
                            break
                        default:
                            reject("Invalid starting character: " + el[0])
                        }
                })    
            } catch (e) {
                reject(e)
            }
            resolve(map)
        })
    }
}

export {FileParser}