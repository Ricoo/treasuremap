class MapProcessor {
    processMap(map) {
        return new Promise((resolve, reject) => {
            map.doSteps()
            resolve(map)
        })
    }
}

export {MapProcessor}