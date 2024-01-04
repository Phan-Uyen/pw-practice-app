import { test } from "@playwright/test";
 test.beforeEach(async({page})=>{
   await page.goto('https://demo.activeitzone.com/ecommerce/login')
 })
//1. id: #
 test('locator By Id',async({page})=>{
    // await page.locator('#email').fill('uyen@gmail.com');
    //1. Xpath tuyệt đối
    //await page.locator(`xpath=/html/body/div/section/div/div[2]/div/div/div/div[3]/div/form/div[1]/input`).fill('uyen@gmail.com');
    //2. Xpath tương đối:
    //page.locator('//*[@id="inputEmail1"]')//id
    await page.locator('//*[@type="email"]').fill('uyen@gmail.com');//distribute 
 })
 //2. distribute []
 test('locator By distribute',async({page})=>{
    await page.locator('[name="password"]').fill('123');
 })
 //3. class: .
 test('locator By Class',async({page})=>{
    await page.locator('.text-reset').click();
 })
 