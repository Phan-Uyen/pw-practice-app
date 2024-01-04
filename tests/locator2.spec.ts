import { expect, test } from "@playwright/test";
test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/',{timeout:50000});

    
})
test ('locator',async({page})=>{
    //1. by tag name --> ('tagname')
    //await page.locator('//input [@id ="inputEmail1"]').click()
    //2. by id--> ('#idvalue')
    //await page.locator('#inputEmail1').click()
    //3. class value('.')
   // await page.locator('.shape-rectangle').click()
    //4. attribute('[attributeName ="attributeValue"]')
   // await page.locator('[placeholder="Email"]').click()
    //5. full class value ('[class ="fullValueClass"]')--> the same with number 4
   // await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]').click()
    //6. Combine difference selector
    //await page.locator('input#inputEmail1').click()
    //7. text
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.locator(':text-is("Using the Grid")').click()
})
test ('User facing locator',async({page})=>{
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.getByRole('textbox',{name: 'Email'}).first().click()
    await page.getByRole('button',{name: 'Sign in'}).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByTitle('IoT Dashboard').click()
    const auth= page.getByText('Auth')
    await auth.click();
    console.log('auth',auth);

});
//locator for Form Layout
test('Forms',async({page})=>{
    //await page.locator('nb-card').filter({hasText:'Using the Grid'}).getByRole('radio',{name:'Option 1'});
    //I.  Form Layouts
    //1. Inline Form
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.getByPlaceholder('Jane Doe').fill('Uyen');
    await page.locator('nb-card',{hasText:'Inline form'}).getByPlaceholder('Email').fill('uyen@gmail.com');
    await page.locator('nb-card',{hasText:'Inline form'}).locator('[class="custom-checkbox"]').check({force:true});
    await page.locator('nb-card',{hasText:'Inline form'}).getByRole('button').click();
    //2. Using the Grid
    const usingTheGridForm = page.locator('nb-card',{hasText:'Using the Grid'});
    await usingTheGridForm.getByRole('textbox',{name:'Email'}).fill('uyen@gmail.com');
    await usingTheGridForm.getByLabel('Password').fill('123');
    await usingTheGridForm.locator('nb-radio',{hasText:'Option 1'}).click();
    await page.locator('nb-card nb-radio',{hasText:'Option 2'}).click();
    await page.locator('nb-card').filter({hasText:'Using the Grid'}).getByRole('button',{name:'Sign in'}).click();
    await page.locator('nb-card',{hasText:'Using the Grid'}).locator('button').click();
    await page.locator('nb-card').getByRole('button').nth(1).click();
    await page.locator('nb-card #inputEmail1').click();
    //3. Basic form
    // const basicForm = page.locator('nb-card :text-is("Basic form")');
    //const basicForm = page.locator('nb-card',{hasText:'Basic form'});
    // page.locator(':text-is("Using the Grid)"')
    //const basicForm = page.locator('nb-card-header').locator(':text-is("Basic form")');
    // const basicForm = page.locator(':text-is("Basic form")');
    const basicForm = page.locator('nb-card',{has:page.locator(':text-is("Basic form")')});
    await basicForm.getByRole('textbox',{name:'Email'}).fill('basic@gmail.com');
    //await page.locator('#exampleInputEmail1').fill('basic@gmail.com');
    await basicForm.getByLabel('Password').fill('456');
    await basicForm.getByRole('checkbox',{name:'Check me out'}).check({force:true});
    await basicForm.getByRole('button',{name: 'Submit'}).click();
    //4. Form without labels
    //getby
    await page.getByPlaceholder('Recipients').fill('recip');
    await page.getByPlaceholder('Subject').fill('sub');
    await page.getByPlaceholder('Message').fill('messa');
    await page.getByRole('button',{name:'Send'}).click();
    //locator
    await page.locator('[placeholder="Recipients"]').fill('recip');
    await page.locator('[placeholder="Subject"]').fill('su');
    await page.locator(':text-is("Send")').click()
    await page.locator('[status="success"]').click();
    await page.locator('.status-success').click();
    //Block form
    await page.locator('#inputFirstName').fill('uyen');
    await page.locator('[placeholder="Last Name"]').fill('123');
    await page.locator('#inputEmail').fill('uyen@gmail.com');
    await page.getByRole('textbox',{name:'Website'}).fill('web');
    await page.locator('nb-card').filter({hasNot: page.locator('.custom-checkbox')}).getByRole('button',{name:'Submit'}).click();
    //Horizontal form
    const horizontalForm = page.locator('nb-card',{hasText:'Horizontal form'});
    await horizontalForm.locator('[placeholder="Email"]').fill('ho');
    await horizontalForm.locator('[for="inputPassword3"]').fill('pass3');
    await horizontalForm.getByRole('checkbox').check({force:true});
    await horizontalForm.getByRole('button').click();
});
test('Datepicker',async({page})=>{
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    await page.getByPlaceholder('Form Picker').click();
    //await page.locator('nb-calendar-day-cell').getByText('27',{exact:true}).nth(1).click();
    await page.locator('nb-calendar-view-mode').textContent()
    // console.log(calendarViewMode);
    await page.locator('nb-calendar-view-mode [ng-reflect-icon="chevron-down-outline"]').click();
    // await page.locator('nb-calendar-view-mode [data-name="chevron-up"]').click();
    // await page.locator('nb-calendar-pageable-navigation [data-name="chevron-left"]').click();
    // await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
    await page.locator('nb-calendar-year-cell').getByText('2023').click();
});


test.describe('Modal',()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Modal & Overlays').click();
    
    });
    test('Open Dialog',async({page})=>{
        await page.getByText('Dialog').click();
        await page.getByText('Open Dialog with component').click();
        await page.getByRole('button',{name:'Dismiss Dialog'}).click();
    })
    test('Return Results',async({page})=>{
        await page.getByText('Dialog').click();
        await page.getByText('Enter Name').click();
        await page.getByPlaceholder('Name').fill('Uyen');
        await page.getByRole('button',{name:'Submit'}).click();
       const nameResult =  await page.locator('nb-card',{hasText:'Return Result From Dialog'}).locator('[class="ng-star-inserted"]').textContent();
     expect(nameResult).toContain('Uyen');
    })

    test('Window',async({page})=>{
        await page.getByText('Window').click();
        await page.getByRole('button',{name:'Open window form'}).click();
        await page.locator('#subject').fill('Uyen');
        await page.locator('label',{hasText:'Text'}).fill('Ngoc');
        await page.locator('[data-name="minus"]').click()
    });
    test ('Toastr',async({page})=>{
        await page.getByText('Toastr').click();
        await page.locator('[class="form-group"]',{hasText:'Position:'}).locator('[class="select-button"]').click();
        await page.locator('nb-option-list').getByText('bottom-right').click();
        const positionValue= page.locator('[class="form-group"]',{hasText:'Position:'}).locator('[class="select-button bottom"]')
        await positionValue.textContent();
        //console.log('positionValue',positionValue);
       await expect(positionValue).toHaveValue('bottom-right');

    })
    test('getText',async({page})=>{
        await page.getByText('Toastr').click();
        const value = await page.locator('[class="form-group"]',{hasText:'Position:'}).locator('[class="select-button"]').textContent();
        expect(value).toEqual('top-right')
        
    })

    test('getText2',async({page})=>{
        await page.getByText('Toastr').click();
        await page.locator('[class="form-group"]',{hasText:'Position:'}).locator('[class="select-button"]').click();
        await page.locator('nb-option-list').getByText('bottom-right').click();
        const value = await page.locator('[class="form-group"]',{hasText:'Position:'}).locator('[class="select-button"]').textContent();
        expect(value).toEqual('top-right')

        
    })

    test('Toaster Type',async({page})=>{
        await page.getByText('Toastr').click();
        //await page.locator('[class="form-group"]',{hasText:'Toaster type:'}).locator('[data-name="chevron-down"]').click();
        // wrong: await page.locator('label',{hasText:'Toast type:'}).locator('[data-name="chevron-down"]').click();
        await page.locator('[ng-reflect-selected="primary"]').locator('[data-name="chevron-down"]').click();
        await page.locator('[ng-reflect-value="success"]').click()
        //await page.locator('nb-option').locator('[ng-reflect-value="success"]').click()
        //await page.locator('#nb-option-8').click()
        //await page.locator('[class="form-group"]',{hasText:'Toast type:'}).locator('[class="select-button"]').locator('span').textContent()
       //await page.locator('[class="form-group"]',{hasText:'Toast type:'}).locator('[class="select-button"]').click();
        await page.locator('[ng-reflect-selected="success"]').locator('span').textContent();
        //const toastTypeValue = await page.locator('[class="form-group"]',{hasText:'Toast type:'}).locator('span').textContent();
        //expect(toastTypeValue).toEqual('success')


    })

    test('checkbox',async({page})=>{
        await page.getByText('Toastr').click();
        await page.locator('nb-checkbox').getByText('Prevent arising of duplicate toast').check({force:true});
        //right: await page.locator('nb-checkbox').locator('span',{hasText:'Prevent arising of duplicate toast'}).check({force:true});
        //wrong: await page.locator('nb-checkbox',{hasText:'Prevent arising of duplicate toast'}).check({force:true});
        //wrong: await page.locator('nb-checkbox').filter({hasText:'Prevent arising of duplicate toast'}).check({force:true});
       // await page.getByRole('checkbox',{name:'Prevent arising of duplicate toast'}).check({force:true});
    })

//Tables and Data
    test.describe('Tables and Data',()=>{
        test.beforeEach(async({page})=>{
            await page.getByText('Tables & Data').click();
          
        })
        test('Smart Table Add New',async({page})=>{
            await page.getByText('Smart Table').click();
            await page.locator('.nb-plus').click();
            const inputValue = page.locator('input-editor')
            await inputValue.getByPlaceholder('ID').fill('200');
            await inputValue.getByPlaceholder('First Name').fill('Uyen');
            await inputValue.getByPlaceholder('Last Name').fill('Minh');
            await inputValue.getByPlaceholder('Username').fill('UyenMinh');
            await inputValue.getByPlaceholder('E-mail').fill('uyen@gmail.com');
            await inputValue.getByPlaceholder('Age').fill('18');
            await page.locator('.nb-checkmark').click();
        });

        test('Smart Table Edit',async({page})=>{
            await page.getByText('Smart Table').click();
            await page.locator('tr',{hasText:'mdo@gmail.com'}).locator('[class="nb-edit"]').click();
        })
//page click but not display in UI
        test('page',async({page})=>{
            await page.getByText('Smart Table').click();
            // const pagethird = page.locator('ng2-smart-table-pager').locator('li').nth(2)
            // await pagethird.click();
            // await page.locator('.nb-plus').click();
            await page.waitForTimeout(4000)
            await page.locator('.ng2-smart-pagination').filter({hasText:'4'}).click()
            await page.locator('.nb-plus').click()
        })

        test('Tree grid',async({page})=>{
            await page.getByText('Tree Grid').click();
            const searchfield = page.locator('#search')
            await searchfield.fill('uyen');
            await searchfield.clear();
            await page.locator('tr',{hasText:'Projects'}).locator('[data-name="chevron-right"]').click()
        })

        test ('auth',async({page})=>{
            await page.getByText('Auth').click();
            await page.getByText('Login').click();
            await page.locator('#input-email').fill('uyen@gmail.com');
            await page.locator('#input-password').fill('1234');
            await page.getByRole('checkbox').check({force:true});
            await page.getByRole('button',{name:'Log in'}).click();


        })
    });
}

);


