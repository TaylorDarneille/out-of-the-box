const request = require('request');
const cheerio = require('cheerio');
const db = require('./models');

request('https://www.doc.wa.gov/corrections/incarceration/default.htm', (error, response, body) => {
	const $ = cheerio.load(body);
	const ul = $('.padded-list').get(0)
	const list = $(ul).find('li a').map((index, element)=>{
		const deconstructedName = $(element).text().split(" ")
		const rawAbbr = deconstructedName.pop()
		return {
			name: deconstructedName.join(" "),
			abbreviation: rawAbbr.substring(1, rawAbbr.length-1),
			url: $(element).attr('href')
		}
	}).get();
	const sites = list.splice(1)
	db.site.bulkCreate(sites)
})