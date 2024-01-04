import { test } from "@playwright/test";
import { PageManager } from "../page-object/pageManager";
// import { NavigationPage} from "../page-object/navigationPage";
// import { FormLayoutPage } from "../page-object/formLayoutsPage";
// import { DatePicker1 } from "../page-object/datepicker";

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/pages/iot-dashboardS',{timeout:10000})
})

//1. first page object
test ('navigation page',async({page})=>{
    const pm = new PageManager(page);
    await pm.navigationTo().formLayoutsPage();
    await pm.navigationTo().datepickerPage();
    // const navigationTo = new NavigationPage(page);
    // await navigationTo.formLayoutsPage();
    // await navigationTo.datepickerPage();
    // await navigationTo.smartTablePage();
    // await navigationTo.toastrPage();
    // await navigationTo.tooltipPage();
});
//2. expand/collapse 
//3. locator in page object
//4 Parametrix Method
test('submit using the Grid',async({page})=>{
    const pm = new PageManager(page);
    await pm.navigationTo().formLayoutsPage();
    await pm.submitToFormLayoutPage().submitUsingTheGridForm('test@test.com','123','Option 1');
    // const navigationTo = new NavigationPage(page);
    // const submitTo = new FormLayoutPage(page);
    // await navigationTo.formLayoutsPage();
    // await submitTo.submitUsingTheGridForm('test@test.com','123','Option 1')
});
test('submit using Inline',async({page})=>{
    const pm = new PageManager(page);
    await pm.submitToFormLayoutPage();
    await pm.navigationTo().formLayoutsPage();
    await pm.submitToFormLayoutPage().submitInlineForm('Uyen','uyen123@gmail.com',false);
    await pm.navigationTo().datepickerPage()
    await pm.datepicker().selectdatepickerFromToday(2);
    // const navigationTo = new NavigationPage(page);
    // const submitTo = new FormLayoutPage(page);
    // const datepicker = new DatePicker1(page);//form picker + range picker
    // await navigationTo.formLayoutsPage();
    // await submitTo.submitInlineForm('Uyen','uyen123@gmail.com',false)
    // await navigationTo.datepickerPage();
    // await datepicker.selectdatepickerFromToday(2)
    // await datepicker.selectdatepickerWithRangeFromToday(2,3)
    

});
// test ('date picker page',async({page})=>{
//     const navigationTo = new NavigationPage(page);
//     const datepicker = new DatePicker(page);
//     await navigationTo.datepickerPage();
//     await datepicker.selectdatepickerFromToday(1)
// })







