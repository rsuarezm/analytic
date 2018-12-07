const
    json = require('./json/PLP.json'),
    entries = json.log.entries

const
    printMessage = text => console.log(`-------- ${text} --------`),
    contains = (entry, pattern) => {
        let value = 0
        pattern.forEach(word => {
            if ((entry.request.url).includes(word)) value++
        })
        return value >= 1
    },
    getRecurso   = request  => {
        let    recurso = request.url.split("/")
        return recurso[recurso.length - 1]
    },
    getTimeInMs  = timings  => (parseFloat(timings.send) + parseFloat(timings.wait) + parseFloat(timings.blocked)).toFixed(2),
    getSizeInKb  = response => (parseInt(response._transferSize) / 1024).toFixed(2),
    getType      = recurso  => {
        let type = null
        if (recurso.indexOf('?') == '-1') {
            type = recurso.split('.');
            type = type[type.length - 1];
        } else {
            type = recurso.split('?');
            type = type[0].split('.');
            type = type[type.length - 1];
        }
        return type.toUpperCase()
    },
    isExtern     = request  => (request.url).includes('.liverpool') ? 'Liverpool' : 'Externo',
    printConsole = entry    => {
        const {request, response, timings} = entry
        console.log(`WAP, PDP, ${getType(getRecurso(request))}, ${getRecurso(request)}, ${getTimeInMs(timings)} ms, ${getSizeInKb(response)} KB, ${isExtern(request)}`)
    }

printMessage('JAVASCRIPT')
entries.forEach(entry => {
    if (contains(entry, ['.js'])) printConsole(entry)
})

printMessage('CSS')
entries.forEach(entry => {
    if (contains(entry, ['.css'])) printConsole(entry)
})

printMessage('IMAGES')
entries.forEach(entry => {
    if (contains(entry, ['.svg', '.gif', '.jpg', '.png'])) printConsole(entry)
})

printMessage('FONTS')
entries.forEach(entry => {
    if (contains(entry, ['.woff', '.ttf', '.woff2'])) printConsole(entry)
})