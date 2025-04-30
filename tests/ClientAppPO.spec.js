import { test, expect } from '@playwright/test';
const {LoginApp}=require('../pageobject/LoginApp');
const {Dashboard}=require('../pageobject/Dashboard');
//Importing Json file 
const Dataset=JSON.parse(JSON.stringify(require('../tests/utils/placeOrderTestdata.json')));

for(const data of Dataset)
{


test(`E2E_flow_handson ${data.productname}`, async ({ page }) => {
    //await page.goto('https://rahulshettyacademy.
    // com/client');
   // const username='raghavabhishek1999@gmail.com';
    //const password='Madhvi@143';
    const LoginPage=new LoginApp(page)
    
    //console.log (await page.title());
   await LoginPage.goTo()
   await  LoginPage.validLogin(data.username,data.password);
   console.log("adding new changes to commit")

   // await page.waitForLoadState('networkidle');
    //const products= await page.locator(".card-body");
    //const count= await products.count();
    const productname='IPHONE 13 PRO';
    const DashboardPage=new Dashboard(page)

   // await products.nth(1).locator("b").waitFor();
  await DashboardPage.AddToCart(productname);
  await DashboardPage.Cartbox();
   // for(let i=0;i<count;i++)
   // {
      //  const product=await products.nth(i).locator("b").textContent()
       // if (await products.nth(i).locator("b").textContent()===productname)

       // {
        //    const product=await products.nth(i).locator("b").textContent()
           // console.log(product)
           // await products.nth(i).locator("text= Add To Cart").click();
            
          //  break;
     //   }

  //  }
      const country=' India'
   
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
}