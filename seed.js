const request = require('request');
const cheerio = require('cheerio');

request('https://www.doc.wa.gov/corrections/incarceration/default.htm', (error, response, body) => {
	const $ = cheerio.load(body);
	const ul = $('.padded-list').get(0)
	const list = $(ul).find('li a').map((index, element)=>{
		return $(element).text()
	}).get();
	const sites = list.splice(1)
	console.log(sites)
})