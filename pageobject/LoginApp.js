class LoginApp
{
    constructor(page)
    {
      this.page=page
      this.signinbutton=page.locator('#login');
      this.username=page.locator("#userEmail");
      this.password=page.locator("#userPassword");
    }


    async validLogin(username,password)
    {
       await this.username.fill(username);
        await this.password.fill(password);
        await this.signinbutton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goTo() 
    {
       await this.page.goto("https://rahulshettyacademy.com/client");
    }

}  
 module.exports= {LoginApp};


