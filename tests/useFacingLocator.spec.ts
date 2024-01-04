//textbox,button.label,text, title, tétID
import { Locator, expect, test } from "@playwright/test";
test.beforeEach(async({page})=>{
    await page.goto ('http://localhost:4200/pages/iot-dashboardS');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Use face Locator',async({page})=>{
    // await page.getByRole('textbox').first().click();
    await page.getByRole('textbox',{name:'Email'}).first().click();
    await page.getByRole('button',{name:'Sign in'}).first().click();
    await page.getByLabel('Email').first().click();
    await page.getByPlaceholder('Jane Doe').click();
    // await page.getByText('Using the Grid').click();
    await page.getByTestId('SignIn').click();
    await page.getByTitle('IoT Dashboard').click();
});

test('Use face Locator2',async({page})=>{
    await page.getByTestId('SignIn').click();
});
test('locating child elements',async({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 2")').click();// nhieu the nen phai co dau cach
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click();
    await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click();
}
)

test('locating parent elements',async({page})=>{
    // locator --> has Text
    await page.locator('nb-card',{hasText:'Using the Grid'}).getByRole('textbox',{name:'Email'}).click()
    // locator --> has locator
    await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox',{name:'Email'}).click()
    //locator --> Filter --> Has Text
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:'Email'}).click();
    //filter red button
    await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox',{name:"Password"}).click()
    //filter checkbox --> text
    await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'})
    .getByRole('textbox',{name:'Email'}).click()
    // .getByRole('textbox',{name:'Email'}).click()
})

// resusing Locator
test('Resue Locator1',async({page})=>{
    await page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('textbox',{name:'Email'}).fill('test@test.com');
    await page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('textbox',{name:'Password'}).fill('Welcome123');
    await page.locator('nb-card').filter({hasText:'Basic form'}).locator('nb-checkbox').click();
    await page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('button').click();
})
test('Resue Locator2',async({page})=>{
    const basicForm =page.locator('nb-card').filter({hasText:'Basic form'});
    const emailField =basicForm.getByRole('textbox',{name:'Email'});
    const passWord =basicForm.getByRole('textbox',{name:'Password'});
    await emailField.fill('test@test.com');
    await passWord.fill('Welcome123');
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click();
    expect(emailField).toHaveValue('test@test.com')
})
// EXTRACT VALUE

test('Extract Value',async({page})=>{
    //single text
    const basicForm = page.locator('nb-card').filter({hasText:'Basic form'});
    const buttonText = await basicForm.getByRole('button').textContent();
    expect(buttonText).toEqual('Submit')
    //all Value text
    const allValueRadio = await page.locator('nb-radio').allTextContents();
    expect(allValueRadio).toContain('Option 1');
    //input
    const emailField=  basicForm.getByRole('textbox',{name:'Email'});
    await emailField.fill('test@test.com');
    const emailValue =await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com');
    //
    const placeHolderValue =await emailField.getAttribute('placeholder');
    expect(placeHolderValue).toEqual('Email');
   //uyenviet
  const emailFiedld1= await basicForm.getByRole('textbox',{name:'Email'}).fill('test@test.com');

   const emailValue1= await basicForm.getByRole('textbox',{name:'Email'}).inputValue();
   expect(emailValue1).toEqual('test@test.com');
})
    //assertions
    test('assertion',async({page})=>{
        //general assertion
        const basicFormButton = page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('button')
        const basicButtonValue = await basicFormButton.textContent();
        expect(basicButtonValue).toEqual('Submit')
        //locator assertion
        await expect(basicFormButton).toHaveText('Submit')
        //soft assertion
        // await expect.soft(basicFormButton).toHaveText('Submit5');
        // await basicFormButton.click()
    });

    
    


