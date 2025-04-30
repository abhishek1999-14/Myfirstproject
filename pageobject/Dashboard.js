class Dashboard{


    constructor(page)
    {
        this.page=page;
        this.products= page.locator(".card-body");
        this.count=page.locator(".card-body").count();
        this.Cartboxicon= page.locator("[routerlink='/dashboard/cart']");

        
    }

  async AddToCart(productname)
  { 
    console.log("Hellos")
    //const count=this.products.count();
    //console.log(count)

            // Wait for the count to resolve
  const productCount = await this.count;

        
    for(let i=0;i<productCount;i++)

        
        { 
            const producttext=await this.products.nth(i).locator("b").textContent();
            
            if (await producttext===productname)
    
            {
                await this.products.nth(i).locator("text= Add To Cart").click();
                
                break;
            }
    
        }
  }
  async Cartbox()
  {
    await this.Cartboxicon.click();
  }

}

module.exports= {Dashboard};