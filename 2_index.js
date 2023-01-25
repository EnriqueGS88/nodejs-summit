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
    // const text_Coin_1 = await page.$eval( selectorCoin_1, e => e.textContent );
    // console.log( text_Coin_1 );
    
    /*
    // *************
        CONTINUE HERE
    // *************
    */

    // Option 1) - Unique Selectors

    const selectorETHName = 'td[class="Va(m) Ta(start) Px(10px) Fz(s)"]';

    const name = await page.$eval( selectorETHName, e => e.textContent );

    console.log( name );



    // Option 2) - Selector Path

    const selectorPathETHName = '#scr-res-table > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2)';

    let nameArr = []; 

    for ( let i = 1; i < 26; i++ ) {

        const selectorThisName = `#scr-res-table > div:nth-child(1) > table > tbody > tr:nth-child(${ i }) > td:nth-child(2)`;

        const thisName = await page.$eval( selectorThisName, e => e.textContent );
        
        nameArr.push( thisName );

    }

    console.log( nameArr );

    await browser.close();

    // store in an array



}

getObject();
