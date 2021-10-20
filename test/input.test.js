import { FileParser } from "../src/input.js"
import { Blob } from "buffer"

describe("input test", () => {

    let inp = new FileParser();
    const fakeBlob = {
        "content":["C - 3 - 3\nM - 2 - 2\nT - 1 - 2 - 1"],
        "options":{type: "text/plain;charset=utf-8"
    }}

    test("file reading", ()=>{
        inp.getFile(fakeBlob).then(()=>{
            expect(inp.descstring).toBe([
                "C - 3 - 3",
                "M - 2 - 2",
                "T - 1 - 2 - 1"
            ])
        })
    })
    
    test("basic descstring", ()=>{
        inp.descstring = [
            "C - 3 - 4"
        ]
        inp.parseInput().then((res) => {
            const map = res
            expect(map.x).toBe(3)
            expect(map.y).toBe(4)
        })
    })

    test("obstacle descstring", ()=>{
        inp.descstring = [
            "C - 3 - 4",
            "M - 2 - 2"
        ]
        inp.parseInput().then((res) => {
            const map = res
            expect(map.map[2][2]).toBe('M')        
        })
    })
    
    test("treasure descstring", ()=>{
        inp.descstring = [
            "C - 3 - 4",
            "T - 2 - 2 - 3"
        ]
        inp.parseInput().then((res) => {
            const map = res
            expect(map.map[2][2]).toBe(3)        
        })
    })
})