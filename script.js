import { chromium } from "playwright"


(async () => { 
   const browser = await chromium.launch({headless: true}); 
   const context = await browser.newContext(
	   { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' +
            ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36', }); 
   const page = await context.newPage(); 
	    // Navigate to a website 
   await page.goto('https://www.ogol.com.br/team_competition.php?op=&id_equipa=2245&id_comp=51&id_epoca=0&page=1');
   const res = await page.evaluate(() => { 
      const elements = document.getElementsByClassName('sign'); 
      const allHome = document.getElementsByClassName('home'); 
      const allAway = document.getElementsByClassName('away'); 
      const allDates =document.getElementsByClassName("double");
      const dict = {
         'E': "Empate",
         'D': 'Derrota',
         'V': 'Vitória'
      }
      const results = Array.from(elements).map(el => dict[el.innerHTML])
      const gameDates = Array.from(allDates).map(el => el.innerHTML).filter(el => !el.includes("R"))
      const allHomeTeams = Array.from(allHome).map(el => el.children[0].innerHTML)
      const treatedHomeTeams = []
      allHomeTeams.forEach(el => {
         treatedHomeTeams.push(el.replace("<b>", "").replace("</b>", ""))
      })

      const allAwayTeams = Array.from(allAway).map(el => el.children[0].innerHTML)
      const treatedAwayTeams = []
      allAwayTeams.forEach(el => {
         treatedAwayTeams.push(el.replace("<b>", "").replace("</b>", ""))
      })
      
      return {
         "results": results,
         "gameDates": gameDates,
         "allHomeTeams": treatedHomeTeams,
         "allAwayTeams": treatedAwayTeams
      }
  });
  await browser.close(); 
  const response = []
  for(let i = 0; i <= res.results?.length; i++) {
   response.push({
      "resultado":  res.results[i] || "",
      "times": res.allHomeTeams[i] + "|" + res.allAwayTeams[i] || "",
      "data": res.gameDates[i] || "",
   })
  }
  console.log(response.filter(el => el.resultado != ''));
 
      
})();
