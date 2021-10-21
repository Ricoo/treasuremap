import 'regenerator-runtime/runtime'
import { FileParser } from "../src/input.js"
import { Blob } from "buffer"

describe("input test", () => {
    const flushPromises = () => new Promise(setImmediate);
    let inp = new FileParser();
    const fakeBlob = {
        "content":["C - 3 - 3\nM - 2 - 2\nT - 1 - 2 - 1"],
        "options":{type: "text/plain;charset=utf-8"
    }}

    test.skip("file reading", async ()=>{
        // Does not work due the the dependancy on FileReader in getFile        

        inp.getFile(fakeBlob).then(()=>{
            expect(inp.descstring).toBe([
                "C - 3 - 3",
                "M - 2 - 2",
                "T - 1 - 2 - 1"
            ])
        })
        await flushPromises()
    })
    
    test("basic descstring", async ()=>{
        inp.descstring = [
            "C - 3 - 4"
        ]
        inp.parseInput().then((res) => {
            const map = res
            expect(map.x).toBe(3)
            expect(map.y).toBe(4)
        })
        await flushPromises()
    })

    test("obstacle descstring", async ()=>{
        inp.descstring = [
            "C - 3 - 4",
            "M - 2 - 2"
        ]
        inp.parseInput().then((res) => {
            const map = res
            expect(map.map[2][2]).toBe('M')        
        })
        await flushPromises()
    })
    
    test("treasure descstring", async ()=>{
        inp.descstring = [
            "C - 3 - 4",
            "T - 2 - 2 - 3"
        ]
        inp.parseInput().then((res) => {
            const map = res
            expect(map.map[2][2]).toBe(3)        
        })
        await flushPromises()
    })
})