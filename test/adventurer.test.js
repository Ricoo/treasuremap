import 'regenerator-runtime/runtime'
import {Adventurer} from "../src/adventurer"
import {FileParser} from "../src/input"

describe("adventurer test", () => {
    const flushPromises = () => new Promise(setImmediate);
    const mapPromise = (data) => {
        let f = new FileParser()
        f.descstring = data
        return f.parseInput()
    }
    test("adventurer creation", () => {
        const adv = new Adventurer("toto", 1, 1, 'S', "AADA")
        expect(adv.name).toBe("toto")
        expect(adv.x).toBe(1)
        expect(adv.y).toBe(1)
        expect(adv.rotation).toBe("S")
        expect(adv.seq).toBe("AADA")
        expect(adv.treasures).toBe(0)
        expect(adv.isActive).toBe(true)
    })

    test("adventurer movement test", async () => {
        let adv = new Adventurer("foo", 0, 0, 'E', "A")
        mapPromise([
            "C - 5 - 4",
            "M - 2 - 3",
            "M - 1 - 1",
            "T - 2 - 2 - 3"
        ]).then((map)=>{
            expect(adv.x).toBe(0)
            expect(adv.y).toBe(0)
            adv.doStep(map)
            expect(adv.x).toBe(1)
            expect(adv.y).toBe(0)    
        })
        await flushPromises()
    })

    test("adventurer obstacle test", async () => {
        let adv = new Adventurer("foo", 0, 1, 'E', "A")
        mapPromise([
            "C - 5 - 4",
            "M - 2 - 3",
            "M - 1 - 1",
            "T - 2 - 2 - 3"
        ]).then((map)=>{
            expect(adv.x).toBe(0)
            expect(adv.y).toBe(1)
            adv.doStep(map)
            expect(adv.x).toBe(0)
            expect(adv.y).toBe(1)    
        })
        await flushPromises()
    })

    test("adventurer treasure test", async () => {
        let adv = new Adventurer("foo", 1, 2, 'E', "A")
        mapPromise([
            "C - 5 - 4",
            "M - 2 - 3",
            "M - 1 - 1",
            "T - 2 - 2 - 3"
        ]).then((map)=>{
            expect(adv.x).toBe(1)
            expect(adv.y).toBe(2)
            expect(adv.treasures).toBe(0)
            console.log(map)
            map.advlist.push(adv)
            map.doSteps()
            expect(adv.x).toBe(2)
            expect(adv.y).toBe(2)
            expect(adv.treasures).toBe(1)
            expect(map.map[2][2]).toBe(2)
        })
        await flushPromises()
    })

    test("adventurer complex sequence test", async () => {
        let adv = new Adventurer("foo", 0, 1, 'E', "ADAGAAG")
        mapPromise([
            "C - 5 - 4",
            "M - 2 - 3",
            "M - 1 - 1",
            "T - 2 - 2 - 3"
        ]).then((map)=>{
            expect(adv.x).toBe(0)
            expect(adv.y).toBe(1)
            expect(adv.treasures).toBe(0)
            map.advlist.push(adv)
            map.doSteps()
            expect(adv.x).toBe(2)
            expect(adv.y).toBe(2)
            expect(adv.treasures).toBe(1)
        })
        await flushPromises()
    })

})