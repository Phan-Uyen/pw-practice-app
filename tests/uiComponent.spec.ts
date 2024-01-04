import { expect, test } from "@playwright/test";
import { table } from "console";
import { using } from "rxjs";

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layout Page',()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })
    test('input fields',async({page})=>{
        const usingTheGridEmailInput =page.locator('nb-card').filter({hasText:'Using the Grid'}).getByRole('textbox',{name:'Email'})
        await usingTheGridEmailInput.fill('test@test.com');
        await usingTheGridEmailInput.clear();
        await usingTheGridEmailInput.pressSequentially('test1@test.com');
        //generic asserttion
        //  const emailValue = await usingTheGridEmailInput.inputValue();
        // expect(emailValue).toEqual('test1@test.com');
        // locatpr assertion
        await expect(usingTheGridEmailInput).toHaveValue('test1@test.com');
    }) 
    //2. Radio
    test('check radio',async({page})=>{
        const usingTheGrid = page.locator('nb-card').filter({hasText:'Using the Grid'});

        //Option 1
        await usingTheGrid.getByRole('radio',{name: 'Option 1'}).check({force:true});
        // await usingTheGrid.getByLabel('Option 1').check({force:true})
        // 1. generic thi phai get status of radio
        // const radioStatus =await usingTheGrid.getByRole('radio',{name: 'Option 1'}).isChecked();
        // expect(radioStatus).toBeTruthy;
        //2. locator thi k can lay gi
        await expect(usingTheGrid.getByRole('radio',{name: 'Option 1'})).toBeChecked();
        //Option 2
        await usingTheGrid.getByRole('radio',{name:'Option 2'}).check({force:true});
        //1. Generic thi phai get status of radio
        //const radioStatus = await usingTheGrid.getByRole('radio',{name: 'Option 1'}).isChecked();
        //expect(radioStatus).toBeTruthy;
        //2. Locator thi k can lay status
        await expect(usingTheGrid.getByRole('radio',{name:'Option 2'})).toBeChecked();
        await expect(usingTheGrid.getByRole('radio',{name:'Option 1'})).not.toBeChecked();
    })
})
//3. checkboxs
    test('Check Box',async({page})=>{
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();
        // await page.getByRole('checkbox',{name:'Hide on click'}).click();
        //await page.getByRole('checkbox',{name:'Hide on click'}).uncheck({force:true});
        // await page.getByRole('checkbox',{name:'Prevent arising of duplicate toast'}).uncheck({force:true});
        const allBoxes =page.getByRole('checkbox');
        for(const box of await allBoxes.all()){
            await box.uncheck({force:true});
            expect(box.isChecked()).toBeFalsy;
        }
        
    })
//4.List and dropdown
test('List and DropDown', async({page})=>{
    const dropdown = page.locator('ngx-header nb-select');
    await dropdown.click();
    //page.getByRole('list') // when the list has a UL tag
   // page.getByRole('listitem') //when the list has LI tag
    const optionList = page.locator('nb-option-list nb-option');
    await expect(optionList).toHaveText(['Light','Dark','Cosmic','Corporate']);
    await optionList.filter({hasText:'Cosmic'}).click();
    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color','rgb(50, 50, 89)')


    const colors ={
        "Light": 'rgb(255, 255, 255)',
        "Dark": 'rgb(34, 43, 69)',
        "Cosmic": 'rgb(50, 50, 89)',
        "Corporate":'rgb(255, 255, 255)'
    }
    // console.log('uyen',optionList)
    await dropdown.click();
    for (const color in colors) {
        await optionList.filter({hasText: color}).click();
        await expect(header).toHaveCSS('background-color', colors[color])
        await dropdown.click();
        // if (color != 'Corporate') {
        // await dropdown.click();
        // }
        
    }
    
})
//5. Tooltips
test('Tooltip',async({page})=>{
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();
    const tooltipCard =page.locator('nb-card').filter({hasText:'Tooltip Placements'});
    await tooltipCard.getByRole('button',{name:'TOP'}).hover();
    const tooltip = await page.locator('nb-tooltip').textContent();
    // inspect --> div--> source --> F8--> div --> expand and see the detail
    expect(tooltip).toEqual('This is a tooltip');
})
//6. Dialog
test('Dialog',async({page})=>{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
    page.on('dialog',dialog =>{
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    await page.getByRole('table').locator('tr').filter({hasText:'mdo@gmail.com'}).locator('.nb-trash').click();
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
})
//edit a specific row
test('Edit Age',async({page})=>{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
    //const rowTarget = page.getByRole('row').filter({hasText:'twitter@outlook.com'}).locator('.nb-edit')
    const rowTarget = page.getByRole('row',{name:'Bird'}).locator('.nb-edit')
    await rowTarget.click();
    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('12')
    await page.locator('.nb-checkmark').click();
    // await rowTarget.getByPlaceholder('Age').clear();
    // await rowTarget.getByPlaceholder('Age').fill('25');

})
// specific colum
test('Column',async({page})=>{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
    // await page.locator('.ng2-smart-pagination').filter({hasText:'4'}).click();
    await page.locator('.ng2-smart-pagination').getByText('2').click();
    // await page.locator('.ng2-smart-pagination-nav').getByText('4').click();
    const getRowbyColumn = page.getByRole('row',{name:'11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    await getRowbyColumn.click();
    //await page.getByRole('row',{name:'11'})--> lay 2 row có text là 11 và 16.
    //filter({has: page.locator('td').nth(1).getByText('11')}).click(--> nên tiếp tục dựa vào column và filter by 11
    await getRowbyColumn.locator('.nb-edit').click();
    const editEmail =page.locator('input-editor').getByPlaceholder('E-mail')
    await editEmail.clear();
    await editEmail.fill('uyen@gmail.com');
    await page.locator('.nb-checkmark').click();
    await expect(getRowbyColumn.locator('td').nth(5)).toHaveText('uyen@gmail.com')
    //nếu nó vẫn còn là locator thì vẫn là toHaveText
    //await expect(getRowbyColumn.locator('td').nth(5)).toHaveValue('uyen@gmail.com')
    // test filter of table\

const ages =['20','30','40'];

for (let age of ages) {
    const AgeInput =  page.locator('input-filter').getByPlaceholder('Age')
    await AgeInput.clear();
    await AgeInput.fill(age)
    await page.waitForTimeout(500)
    const ageRows1 = page.getByRole('row');
    const ageRows = page.locator('tbody tr');
    console.log('ageRows1', ageRows1);
    console.log('ageRows', ageRows);

    // console.log('uyen',await ageRows.all())
    for (let row of await ageRows.all()) {
        // console.log('suu',row)
        const cellValue = await row.locator('td').last().textContent();//row dai dien cho 1 row
        if (age=='200') {
            expect(await page.getByRole('table').textContent()).toContain('No data found')
        } else{
            expect(cellValue).toEqual(age)
        }
        // console.log('cellValue',cellValue)

    }
}
})
//date time picker 1
test ('Date Time Picker',async({page})=>{
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    const calendarInput = page.getByPlaceholder('Form Picker')
    await calendarInput.click();
    //1. Hard code
    // await page.locator('[class="day-cell ng-star-inserted"]').getByText('1',{exact:true}).click();
    // await expect(calendarInput).toHaveValue('Dec 1, 2023')
    //2. Dynamic code
    let date = new Date();
    const dateTem =date.getDate()+14;
    date.setDate(dateTem)
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('En-US',{month:'short'});
    const expectedMonthLong = date.toLocaleString('En-US',{month:'long'});
    const expectYear = date.getFullYear();
    const dateassert = `${expectedMonthShort} ${expectedDate}, ${expectYear}`;
    // console.log(date)
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact:true}).click();
    await expect(calendarInput).toHaveValue(dateassert);
    
})
