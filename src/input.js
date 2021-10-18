import { Exception } from "./exception.js";

class FileParser {

    constructor() {
        this.file = null
        this.descstring = ""
    }

    getFile(f) {
        return new Promise((resolve, reject) => {
            if (!f) {
                reject("No file provided")
            }
            let reader = new FileReader();
            reader.addEventListener('error', () => {
                reject("Error while reading file")
            })
            reader.onload = (element) => {
                this.descstring = element.target.result.split(/\r?\n/)
                resolve()
            }
            reader.readAsText(f)
        })
    }

    parseInput() {
        /**
         * TODO : parse file to generate a Map object, containing an array of tiles and the size of the map
         */
         return new Promise((resolve, reject) => {
            reject("test")
            this.descstring.foreach((el) => {
                switch (el[0]) {
                    case '#':
                        break;
                    case 'A':
                        break;
                    case 'M':
                        break;
                    case 'C':
                        break;
                    case 'T':
                        break;
                }
            })
        })
    }
}

export {FileParser}