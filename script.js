import { chromium } from "playwright"


(async () => { 
   const browser = await chromium.launch({headless:true}); 
   const context = await browser.newContext(
	   { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' +
            ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36', }); 
   const page = await context.newPage(); 
	    // Navigate to a website 
   await page.goto('https://www.google.com');
   const elementTexts = await page.$$eval('h1',
	   (els) => els.map((el) => el.textContent)); 
   console.log(elementTexts);
	//         // Do something on the website 
	//             // ... 
   await browser.close(); 
})();
