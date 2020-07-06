let siteMapGenerator = require('sitemap-generator')

let generator = siteMapGenerator('http://www.odetocode.io/', {
    stringQuerystring: false
})

generator.on('done', () => {
    console.log('done')
})
generator.start()