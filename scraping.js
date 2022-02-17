var scrapElo = async function (url){
	const puppeteer = require('puppeteer')

	let infos = []; 

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	try {
		const [el] = await page.$x('/html/body/div[2]/div[3]/div[3]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div/div[1]/div/div/div[2]/div[1]')
		const src = await el.getProperty('textContent');
		const srcTxt = await src.jsonValue();
		
		infos[0] = srcTxt.toString().substring(37).replace(/\n/g, "");
	} catch (error) {
		console.log(`erro: ${error}`);
		infos[0] = "Unranked"
	}
	if (infos[0] != "Unranked") 
	{
		const [el1] = await page.$x('/html/body/div[2]/div[3]/div[3]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div/div[1]/div/div/div[2]/div[4]/span');
		const pdl = await el1.getProperty('textContent');
		const pdlTxt = await pdl.jsonValue();

		infos[1] = pdlTxt;
	}
	browser.close();
	return infos;
}

module.exports = scrapElo;