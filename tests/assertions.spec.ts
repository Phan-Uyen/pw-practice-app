import { expect, test } from "@playwright/test";

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/',{timeout:5000});
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click()

    
})
test('assertion',async({page})=>{
    const basicFormButton = page.locator('nb-card',{hasText:'Basic Form'}).locator('button');
    //1.locator assertion--> HaveText
    await basicFormButton.textContent();
    await expect(basicFormButton).toHaveText('Submit')
    //2. general assertion
    const text = await basicFormButton.textContent();
    expect(text).toEqual('Submit')


})