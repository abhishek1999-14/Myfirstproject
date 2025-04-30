import { test, expect } from '@playwright/test';
test('Attributes', async ({page})=>{

    await page.goto("https://www.easemytrip.com/flights.html");
    await page.getByLabel("Defence Forces").click();
    await page.getByRole("link",{name : "Hotels"}).nth(0).click();

    



  });
  test.only('EaseMytripCalendar', async ({ page }) => {
    
    const Month1 = 'Jul 2025';
    const Month2 = 'Aug 2025';
    const date = '7';
    // Navigate to the URL
    await page.goto("https://www.easemytrip.com/flights.html");
    await page.locator("#oway").click();
    await page.locator("#FromSector_show").nth(0).click();
    await page.locator("#a_FromSector_show").nth(0).pressSequentially("new delhi");
    await page.locator("#Editbox13_show").nth(0).click();
    await page.locator("#a_Editbox13_show").nth(0).pressSequentially("Moscow")

    // Click the "Departure" placeholder
    await page.getByPlaceholder("Departure").nth(0).click();

    // Select the calendar elements
    const Dates = await page.locator("[onclick='SelectDate(this.id)']");
    const Months = await page.locator(".month2");
    console.log(Months.nth(0).textContent());

    // Check if months are as expected, otherwise click the next month button
    while (await Months.nth(0).textContent() !== Month1 || await Months.nth(1).textContent() !== Month2) {
        await page.locator("[onclick*='NextPrevClick']").nth(1).click();
       // await page.waitForTimeout(1000); // Add a small delay to avoid spamming clicks too fast
    }
    
    for (let i = 0; i < await Dates.count(); i++) {
        const dateText = await Dates.nth(i).textContent();
       const actualdate =dateText.split('₹')
       const datetext=actualdate[0]
        
        //console.log(dateText) // Await textContent to get the value
        if (datetext === date) {
            await Dates.nth(i).click(); // Click the date
            break; // Exit the loop once the date is clicked
        }
    }
       
});
