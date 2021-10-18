import { Exception } from "./exception"
import { FileParser } from "./input"

window.onload = () => {
    sendButton = document.getElementById("sendButton")
    fileInput = document.getElementById("fileInput")
    resultDisplay = document.getElementById("resultDisplay")

    sendButton.onclick = () => {
        parser = new FileParser()
        calc = new MapProcessor()
        display = new MapDisplay(resultDisplay)

        parser.getFile(fileInput.files[0])
        .then(
            () => parser.parseInput(),
            (err) => {
                Exception.exceptionHandler(err)
                throw new Error(err)
            })
        .then(
            (map) => calc.processMap(map),
            (err) => {
                Exception.exceptionHandler("Error while reading map: " + err)
            }
        ).then(
            (map) => {
                display.show(map)
                output.apply(map.serialize())
            },
            (err) => {
                Exception.exceptionHandler(err)
            }
        )
    }
}