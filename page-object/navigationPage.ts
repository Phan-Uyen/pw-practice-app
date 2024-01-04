import { Locator,Page } from "@playwright/test";

export class NavigationPage {
    readonly page : Page
    readonly formLayoutMenu: Locator
    constructor(page:Page) {
        this.page = page
        this.formLayoutMenu = page.getByText('Form Layouts')
        
    }

async formLayoutsPage (){
    // 1.await this.page.getByText('Forms').click();
    await this.selectGroupMenu('Forms');
    // 2.await this.page.getByText('Form Layouts').click();
    await this.formLayoutMenu.click();//3Locator in POM
}

async datepickerPage(){
    // await this.page.getByText('Forms').click();
    await this.selectGroupMenu('Forms');
    await this.page.waitForTimeout(1000);
    await this.page.getByText('Datepicker').click();
}

async smartTablePage (){
    await this.selectGroupMenu('Tables & Data');
    await this.page.getByText('Smart Table').click();
}

async toastrPage (){
    await this.selectGroupMenu('Modal & Overlays');
    await this.page.getByText('Toastr').click();
}

async tooltipPage (){
    await this.selectGroupMenu('Modal & Overlays');
    await this.page.getByText('Tooltip').click();

}
//2. expand/collapse 
private async selectGroupMenu(groupTitle:string){
    const groupMenuItems= this.page.getByTitle(groupTitle);
    const expandStatus = await groupMenuItems.getAttribute('aria-expanded');
    if (expandStatus ==='false') {
        await groupMenuItems.click();
    } 
 }

}
//3. 

