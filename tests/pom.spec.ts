import { test } from "@playwright/test";
import { NavigationPage} from "../page-object/navigationPage";
import { FormLayoutPage } from "../page-object/formLayoutsPage";

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/pages/iot-dashboardS')
})

//1. first page object
test ('navigation page',async({page})=>{
    const navigationTo = new NavigationPage(page);
    await navigationTo.formLayoutsPage();
    await navigationTo.datepickerPage();
    await navigationTo.smartTablePage();
    await navigationTo.toastrPage();
    await navigationTo.tooltipPage();
});
//2. expand/collapse 
//3. locator in page object
//4 Parametrix Method
test('submit using the Grid',async({page})=>{
    const navigationTo = new NavigationPage(page);
    const submitTo = new FormLayoutPage(page);
    await navigationTo.formLayoutsPage();
    await submitTo.submitUsingTheGridForm('test@test.com','123','Option 1')
});

test('submit using Inline',async({page})=>{
    const navigationTo = new NavigationPage(page);
    const submitTo = new FormLayoutPage(page);
    await navigationTo.formLayoutsPage();
    await submitTo.submitInlineForm('Uyen','uyen123@gmail.com',false)
});


