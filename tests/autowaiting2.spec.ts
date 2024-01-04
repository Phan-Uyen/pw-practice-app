import { test } from "@playwright/test";

test.beforeEach(async({page})=>{
    await page.goto('http://uitestingplayground.com/ajax')

})
test('ajax Button',async({page})=>{
    await page.locator('#ajaxButton').click();
    // await page.waitForTimeout(25000);
    await page.locator('.bg-success').click()

})