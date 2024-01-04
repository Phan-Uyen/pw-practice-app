import { test } from "@playwright/test";
test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/pages/iot-dashboardS')
})
// test ('test3', async({page}) => {
// await page.getByText('Form Layouts').click();
// });
// test('test4',async({page})=>{
// await page.getByText('Datepicker').click();
// })
//1.testsuiteForm
test.describe('suite1',()=>{
    test.beforeEach(async({page})=>{
    await page.getByText('Forms').click();
})
     test('test 5',async({page})=>{
        await page.getByText('Form Layouts').click();
    })
     test('test 6',async({page})=>{
        await page.getByText('Datepicker').click();
    })
})
//2.testsuiteChart
test.describe('suite2',()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Modal & Overlays').click();
    })
    test('test7',async({page})=>{
        await page.getByText('Dialog').click();
    })
    test('test8',async({page})=>{
        await page.getByText('Window').click();
    })
})
