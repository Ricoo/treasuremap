import { Exception } from "./exception.js"
import { FileParser } from "./input.js"
import { MapProcessor } from "./calculation.js"
import { MapDisplay } from "./display.js"

window.onload = () => {
    let sendButton = document.getElementById("sendButton")
    let fileInput = document.getElementById("fileInput")

    sendButton.onclick = () => {
        let parser = new FileParser()
        let calc = new MapProcessor()
        let result

        parser.getFile(fileInput.files[0])
        .then(
            () => parser.parseInput(),
            (err) => {
                Exception.exceptionHandler(err)
                throw new Error(err)
            }
        )
        .then(
            (map) => calc.processMap(map),
            (err) => {
                Exception.exceptionHandler("Error while reading map: " + err)
            }
        )
        .then(
            (map) => {
                // display.show(map)
                result = new Blob([map.serialize()], {type: "text/plain;charset=utf-8"})
                let a = document.createElement("a")
                a.href = URL.createObjectURL(result)
                a.download = "result.txt"
                document.body.appendChild(a)
                a.click()
                setTimeout(()=>{
                    window.URL.revokeObjectURL(a.href)
                    document.body.removeChild(a)
                }, 1)
            },
            (err) => {
                Exception.exceptionHandler(err)
            }
        )
    }
}