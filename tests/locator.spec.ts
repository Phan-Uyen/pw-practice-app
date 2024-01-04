import { test } from "@playwright/test";
test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/');
    // await page.getByText('Forms').click();
    // await page.getByText('Form Layouts').click();
})
test('Locator Emai', async({page})=>{
    //1.by tag name
    page.locator('input')
    //2. by ID (#)
    await page.locator('#inputEmail1').click()
    //3. by Class value(.)
    // await page.locator('.shape-rectangle').click()
    //4. by attribute([])
    // await page.locator('[placeholder="Email"]').click()
    // //5. by Class value (full)
    // await page.locator('class="input-full-width size-medium status-basic shape-rectangle nb-transition"').click()
    //6.combine diffrent selectors
    await page.locator('input[placeholder="Email"]#exampleInputEmail1').click()// vi la chung 1 cay html nen k co dau cach
    await page.locator('#exampleInputEmail1').click()
    //7.by Xpath(NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')
    //8. by partial text match
    page.locator(':text("Using")')
    //9. by partial text match
    page.locator(':text-is("Using the Grid)"')
})
//10. get attribute
//await groupMenuItems.getAttribute('aria-expanded');

// xpath by text:     //span[text()=’’]
test ('locator by text',async({page})=>{
    //await page.locator(':text("Roller Shades")').click();
    await page.locator('//div[text()="Roller Shades"]').click();
})
