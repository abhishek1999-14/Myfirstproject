import { test, expect } from '@playwright/test';

test('my first playwright', async ({ page }) => {
    const Title='LoginPage Practise | Rahul Shetty Academy'
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log (await page.title());
    await expect(page).toHaveTitle(Title)/////////to assert title
    await page.locator("#username").fill("rahulshettyacadem")
    await page.locator("[name='password']").fill("learning")
    await page.locator("#signInBtn").click()
   const error=  await page.locator("[style='display: none']").textContent()
   console.log(error)
    await expect(page.locator("[style='display: none']")).toContainText("Incorrect");
    await page.locator("#username").fill("");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#signInBtn").click();
    await page.locator(".card-body .card-title").first().waitFor();
    const Iphone=await page.locator(".card-body .card-title").first().textContent();
    console.log(Iphone)
    const allList=await page.locator(".card-body .card-title").allTextContents();
    console.log(allList);

  
  });

  test('UI element test', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").nth(1).click();
 //  await.pause();
 await page.locator("#okayBtn").click();
 await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
 






    


  });
///////////////very very important///////////////////////////
  test('childwindow', async ({page,context})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const[newpage]=await Promise.all([
        context.waitForEvent('page'),
        page.locator("[href*='documents-request']").click()

    ])
     const text= await newpage.locator("[href*='mentor@']").textContent();
     console.log(text);



  });


  test.only('E2E flow handson', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    const email='raghavabhishek1999@gmail.com';
    await page.locator("#userEmail").fill("raghavabhishek1999@gmail.com");
    await page.locator("#userPassword").fill("Madhvi@143");
    await page.locator('#login').click();
    console.log (await page.title());
    await page.waitForLoadState('networkidle');
    const products= await page.locator(".card-body");
    const count= await products.count();
    const productname='IPHONE 13 PRO';
   // await products.nth(1).locator("b").waitFor();
    for(let i=0;i<count;i++)
    {
        const product=await products.nth(i).locator("b").textContent()
        if (await products.nth(i).locator("b").textContent()===productname)

        {
            const product=await products.nth(i).locator("b").textContent()
            console.log(product)
            await products.nth(i).locator("text= Add To Cart").click();
            
            break;
        }

    }
      const country=' India'
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page .locator("text=Checkout").click();
    await page.waitForLoadState('networkidle');
    await page.locator("[placeholder='Select Country']").pressSequentially("ind")
    const dropdown=await page.locator("[class*=ta-results]");
   await dropdown.waitFor();
   const dropdowncount=await page.locator(".ta-results button").count();
   console.log(dropdowncount);
   for(let i=0;i<dropdowncount;i++)
   {
    if(await dropdown.locator("button").nth(i).textContent()==country)
    {
        console.log(await dropdown.locator("button").nth(i).textContent())
        await dropdown.locator("button").nth(i).click();
      
        break;
    }
   }
   await page.locator("[class='input txt']").nth(0).fill("1234");
   await page.locator("[class='input txt']").nth(1).fill("Abhishek Raghav");
   await page.locator("[name='coupon']").fill("rahulshettyacademy");
   await page.locator("[class*='btn-primary']").click();
   await page.locator('a:has-text("Place Order ")').waitFor();
   await page.locator('a:has-text("Place Order ")').click();
  const orderid_text= await page.locator('label.ng-star-inserted').textContent()
  console.log(orderid_text);
  let split_orderid=orderid_text.split("| ");
  console.log(split_orderid[1]);
  const orderid=split_orderid[1];
  await page.locator('label:has-text(" Orders History Page ")').click();
 
  await page.locator("tbody").waitFor();
  const rows=await page.locator("tbody tr");
  console.log(rows.count())
  


  for (let i = 0; i < await rows.count(); ++i) {
     const rowOrderId = await rows.nth(i).locator("th").textContent();
     if (orderid.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
     }
  }





   
  
 });
