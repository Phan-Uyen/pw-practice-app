import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutPage extends HelperBase {
//    private readonly page: Page
    constructor(page: Page) {
        super(page)
        // this.page = page  
    }


    async submitUsingTheGridForm (email:string, password:string, optionText:string){
        const usingTheGridForm = this.page.locator('nb-card').filter({hasText:"Using the Grid"})
        //const usingTheGridForm = this.page.locator('nb-card', {hasText:"Using the Grid"})
        await usingTheGridForm.getByRole('textbox',{name:"Email"}).fill(email);
        await this.waitForNumberOfSecond(2);
        await usingTheGridForm.getByRole('textbox',{name:"Password"}).fill(password);
        await usingTheGridForm.getByRole('radio',{name: optionText}).check({force:true});
        await usingTheGridForm.getByRole('button',{name:'Sign in'}).click();
    }
    /**
     * This methods will out the inline form user detail
     * @param name -should be first and last name
     * @param email - valid email 
     * @param rememberMe - true, false
     */

    async submitInlineForm(name: string, email: string,rememberMe: boolean){
        const usingInlineForm = this.page.locator('nb-card',{hasText:'Inline form'});
        await usingInlineForm.getByRole('textbox',{name:"Jane Doe"}).fill(name);
        await usingInlineForm.getByRole('textbox',{name:"Email"}).fill(email);
        if(rememberMe)
        await usingInlineForm.getByRole('checkbox').check({force:true});
        await usingInlineForm.getByRole('button').click();

      
2.
    }
}
    