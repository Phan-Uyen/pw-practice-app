import { test } from "@playwright/test";
test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/pages/iot-dashboardS')
});
//suite 1
test.describe('suite1',()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
    });
        test('test1',async({page})=>{
           await page.getByText('Form Layouts').click()
        });
        test('test2',async({page})=>{
           await page.getByText('Datepicker').click()
        })
});
//suite 2, test describe chi co ten suite, k truyen param vao
test.describe('suite2',()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Modal & Overlays').click()
    });
    test('test3',async({page})=>{
        await page.getByText('Dialog').click();
    });
    test('test4',async({page})=>{
        await page.getByText('Window').click()
    });
});

