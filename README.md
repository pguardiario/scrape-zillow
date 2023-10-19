# scrape-google-maps
Scrape zillow data from any html

## install
npm i --save scrape-zillow

## use
```javascript
const parse = require('scrape-zillow')

fetch("https://www.zillow.com/homedetails/810-38th-St-Sacramento-CA-95816/25785438_zpid/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US;q=0.9,en;q=0.8",
    "content-type": "text/html",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
  },
  "referrer": "https://www.zillow.com/",
}).then(r => r.text()).then(html => {
  console.log(parse(html))
})
```

If you use this project please consider [supporting my work](https://www.buymeacoffee.com/pguardiario)