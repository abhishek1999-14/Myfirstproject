import { test, expect } from '@playwright/test';
import { only } from 'node:test';

test('my first playwright', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator("input#username").fill("Abhishek");
  console.log (await page.locator("input#password").textContent());
  console.log (await page.title());
   await page.locator("input#password").fill("TatianaAbhishek");
   await page.locator("[value='Sign In']").click();
   console.log(await page.locator("[style='display: block;']").textContent());
   await page.locator("div[class='form-check-inline'] label:nth-child(2) span:nth-child(1)").click
   await page.locator("button#okayBtn").click
   //to get the text content of the element
   console.log(await page.locator("div[class='modal-body'] p").textContent());

});


test('my second playwright', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log (await page.title());
    await page.locator("input#username").fill("rahulshettyacademy");
    await page.locator("input#password").fill("learning");
    await page.locator("[value='Sign In']").click();
    // if multiple elements are there with same CSS then we use this 
    console.log(await page.locator(".card-title a").first().textContent());
    console.log(await page.locator(".card-title a").nth(1).textContent());
    // this waits until its loaded without giving any wait 
    await page.locator(".card-body a").first().waitFor();
    const titles = await page.locator(".card-body a").allTextContents();
    // this will print all the elements of this css without using for loop
    console.log(titles);

  
    
    
  });
  test('MY third  playwright', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log (await page.title());
    const dropdown= page.locator('select.form-control');
    await dropdown.selectOption("consult")
    await page.locator("span.checkmark").nth(0).click();
    await expect(page.locator("span.checkmark").nth(0)).toBeChecked
   await page.locator("body:nth-child(2) div.float-right:nth-child(1) > a.blinkingText:nth-child(1)").click();
   //secondwindowlink.click();
   


    //wait page.pause();
  
    
    
  });
  test('@child window ', async ({ browser }) => {
    const context =await browser.newContext();
    const page =await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log (await page.title());
    const dropdown= page.locator('select.form-control');
    await dropdown.selectOption("consult")
    await page.locator("span.checkmark").nth(0).click();
    await expect(page.locator("span.checkmark").nth(0)).toBeChecked
   const linl= page.locator("body:nth-child(2) div.float-right:nth-child(1) > a.blinkingText:nth-child(1)");
   //secondwindowlink.click();
const [newPage]= await Promise.all([
  context.waitForEvent('page'),
  linl.click(),
])

//wait page.pause();
   
console.log (await newPage.locator(".red").textContent());
const text= await newPage.locator(".red").textContent();
const arraytext = await text.split("@")
const emailid =await arraytext[1].split(" ")[0]
console.log(emailid);
await page.locator("input#username").fill(emailid);




  
  
    
    
  });




  test('E2E flow handson', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    const email='raghavabhishek1999@gmail.com';
    await page.locator("#userEmail").fill("raghavabhishek1999@gmail.com");
    await page.locator("#userPassword").fill("Madhvi@143");
    await page.locator('#login').click();
    console.log (await page.title());
    console.log (await page.locator("div.card-body h5").nth(1).textContent());
    const itemtext=page.locator("div.card-body h5").nth(1).textContent();
    await expect(page.locator("div.card-body h5").nth(1)).toHaveText('ADIDAS ORIGINAL');
    await page.locator("div.card-body button").nth(3).click();
    await page .locator("[routerlink*='cart']").click();
    await page.locator("div li").nth(2).waitFor();
    await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    await page.locator("button:has-text('Checkout')").click();
    await expect(page.locator("div.details__user label").nth(0)).toHaveText(email);
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
    await page.locator("div.form__cc input").nth(1).fill('1234')
    await page.locator("div.form__cc input").nth(2).fill('Abhishek');
    await page.locator("div.form__cc input").nth(3).fill('rahulshettyacademy')
    await page.locator("button:has-text('Apply Coupon')").click();
    await page.locator("p:has-text('* Coupon Applied')").waitFor();
    await page.locator("a:has-text('Place Order ')").click();
    const Orderid =await page.locator("label.ng-star-inserted").textContent();
    console.log(Orderid);
    await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
    const rows=await page.locator("tbody tr");
    
  
  
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (Orderid.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(Orderid.includes(orderIdDetails)).toBeTruthy();
  
 });


 test('Playwright Special locators', async ({ page }) => {
  
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  //await page.pause();
  await page.getByLabel("Employed").check();
 await page.getByLabel("Gender").selectOption("Female");
 await page.getByPlaceholder("Password").fill("abc123");
  //await page.pause();
   await page.getByRole("button", {name: 'Submit'}).click();
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await page.getByRole("link",{name : "Shop"}).click();
  await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

  //locator(css)

});
test('Playwright calender Automation', async ({ page }) => {
  const Year='2027';
  const Month='May';
  const Date='14';


  
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(Year).click();
  await page.getByText(Month).click();
  await page.getByText(Date).click();
  
  console.log (await page.locator(".react-date-picker__inputGroup").textContent());
await page.pause();
  




  

  //locator(css)

});

test.only('Amazon Practice', async ({ page }) => {
  await page.goto("https://www.amazon.com/s?crid=23OLLORHWV9D0&i=computers-intl-ship&k=&ref=nb_sb_noss&sprefix=%2Ccomputers-intl-ship%2C762&url=search-alias%3Dcomputers-intl-ship");

  const returnButton = await page.locator('text=Return');
  
  // Ensure the element is visible before clicking
  await returnButton.waitFor({ state: 'visible' });

  // Click the element
  await returnButton.click();
  
  
  
  //locator(css)

});

