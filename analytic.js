const 
    json    = require('.json/PDP.json'),
    entries = json.log.entries,
     
    getRecurso   = request  => {
        let recurso = request.url.split("/")
        return recurso[recurso.length - 1]
    },
    getTimeInMs  = time     => parseInt(time).toFixed(0),
    getSizeInKb  = response => (parseInt(response._transferSize) / 1024).toFixed(1),
    validateFont = request  => request.url.includes('.ttf') ? 'TTF' : 'WOFF',
    printConsole = entry    => {
        const {time, request, response} = entry
        console.log(`Saca la calaca, WAP, PDP, ${validateFont(request)}, ${getRecurso(request)}, ${getTimeInMs(time)} ms, ${getSizeInKb(response)} KB, Externo`)
    }

entries.forEach(entry => {
    if ((entry.request.url).includes('.js')) printConsole(entry)
})