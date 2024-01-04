import { test } from "@playwright/test";

test.beforeEach(async({page})=>{
    await page.goto('http://uitestingplayground.com/ajax');
    await page.locator('#ajaxButton').click();
})

test('auto',async({page})=>{
    const sucessButton = page.locator('.bg-success');
    await sucessButton.click();
})