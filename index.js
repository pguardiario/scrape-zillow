const cheerio = require('cheerio')

function parse(html) {
  let $ = cheerio.load(html)
  let res = {}
  res.botDetected = !!(html.includes('captcha.px-cloud.net') || $('.px-captcha-message')[0])
  res.links = $('.property-card-data > a[href*=homedetails]').get().map(a => new URL($(a).attr('href'), 'https://www.zillow.com').href)
  let href = $('[rel=next]').attr('href')
  if (href) {
    res.nextPage = new URL(href, 'https://www.zillow.com').href
  }

  if(res.botDetected) {
    return res
  }

  let json = $('[id="__NEXT_DATA__"]').text()
  if (json) {
    let data = JSON.parse(json)

    let cache = data?.props?.pageProps?.gdpClientCache
    if(cache){
      let props = JSON.parse(cache)
      if (props) {
        let property = Object.values(props)[0].property

        let { zpid, bathrooms, bedrooms, daysOnZillow, homeType, livingArea, lotSize, mlsid, price, streetAddress, zipcode, city, state, longitude, latitude, yearBuilt, agent_name, agent_phone, zestimate, rentZestimate } = property
        let mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=12`

        res.property = {  zpid, bathrooms, bedrooms, daysOnZillow, homeType, livingArea, lotSize, price, mlsid, mapUrl, streetAddress, zipcode, city, state, longitude, latitude, yearBuilt, agent_name, agent_phone, zestimate, rentZestimate }
      }
    }
  }

  return res
}

// console.log(parse(fs.readFileSync('test.html')))

module.exports = parse