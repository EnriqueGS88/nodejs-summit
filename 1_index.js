import puppeteer from "puppeteer";

const url = 'https://finance.yahoo.com/crypto?guccounter=1';


// Define objects that will be collected
const selectorCoin_1 = 'td[class="Va(m) Ta(start) Px(10px) Fz(s)"]';
const selectorAcceptCookiesBtn = 'button[name="agree"]';

async function getObject() {

    // open browser session
    const browser = await puppeteer.launch(
        {
            headless: false,
            defaultViewport: {
                width: 1600,
                height: 900,
                deviceScaleFactor: 1,
            }
        }
    );

    // open webpage
    const page = await browser.newPage();

    await page.goto( url );

    await new Promise(r => setTimeout(r, 1200));

    // Accept cookies
    await page.waitForSelector( selectorAcceptCookiesBtn );
    await page.click( selectorAcceptCookiesBtn );

    // await page.waitForNavigation();
    await new Promise(r => setTimeout(r, 1200));

    // go to for redirect
    await page.goto( 'https://finance.yahoo.com/crypto?guccounter=2' );

    // find selector
    await page.waitForSelector( selectorCoin_1 );

    // collect text from selector
    const text_Coin_1 = await page.$eval( selectorCoin_1, e => e.textContent );

    console.log( text_Coin_1 );

    // store in an array

}

getObject();
