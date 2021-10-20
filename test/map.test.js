import { Adventurer } from "../src/adventurer"
import { MapBuilder } from "../src/map"

describe("map test", ()=>{

    test("map size setting", ()=>{
        let m = new MapBuilder()
        m.defineSize([2, 2])
        expect(m.map.length).toBe(2)
        expect(m.map[0].length).toBe(2)
    })

    test("map obstacle setting", ()=>{
        let m = new MapBuilder()
        m.defineSize([2, 2])
        m.addMountain([1, 1])
        expect(m.map[1][1]).toBe('M')
    })

    test("map treasure setting", ()=>{
        let m = new MapBuilder()
        m.defineSize([2, 2])
        m.addTreasures([1, 1, 2])
        expect(m.map[1][1]).toBe(2)
    })
    
    test("map adventurer adding", ()=>{
        let m = new MapBuilder()
        m.defineSize([2, 2])
        m.addAdventurer(["toto", 1, 2, 'E', "ADDAD"])
        expect(m.advlist.length).toBe(1)
        expect(m.advlist[0]).toBeInstanceOf(Adventurer)
    })
})