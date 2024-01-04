import { expect, test } from "@playwright/test";

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layout',()=>{
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })
    test('Using The Grid',async({page})=>{
        //1.email
        const emailInput = page.locator('#inputEmail1');
        await emailInput.fill('test@gmail.com');
        await emailInput.clear();
        //await emailInput.fill('ha@gmail.com');
        await emailInput.pressSequentially('nguyen@gmail.com',{delay:500});
        //general
        //const emailValue = await emailInput.inputValue();
        //expect(emailValue).toEqual('nguyen@gmail.com');
        //locator
        await expect(emailInput).toHaveValue('nguyen@gmail.com');
        //2.password
        const passwordInput = page.locator('#inputPassword2');
        await passwordInput.fill('1234');
        const passwordValue = await passwordInput.inputValue();
        expect(passwordValue).toEqual('1234')
        //3. Radio
        const option1 = page.locator('nb-radio').locator('label').locator('span',{hasText:'Option 1'})
        const option2 = page.locator('nb-radio').locator('label').locator('span',{hasText:'Option 2'})
        await option2.check({force:true})
        //C1
        expect(option2).toBeChecked();
        //C2
        //const option1Status = await option1.isChecked();
        // const option2Status = await option2.isChecked();
        // expect(option2Status).toBeTruthy();
        // expect(option1Status).toBeFalsy();   
    });

    test('Basic Form',async({page})=>{
        const emailInput = page.locator('#exampleInputEmail1')
        const passwordInput = page.locator('#exampleInputPassword1')
        const checkMeOut = page.locator('label',{hasText:'Check me out'});
        const submitButton = page.locator('[status="danger"]')
        await emailInput.fill('uyen@gmail.com');
        await passwordInput.fill('456');
        await checkMeOut.check({force:true});
        await submitButton.click();
        await expect(emailInput).toHaveValue('uyen@gmail.com');
        await expect(passwordInput).toHaveValue('456');
        await expect(checkMeOut).toBeChecked();
    });
    test.describe('Modal&Overlaps',()=>{
        test.beforeEach(async({page})=>{
            await page.getByText('Modal & Overlays').click();
        });

        test('Toastr',async({page})=>{
            await page.getByText('Toastr').click();
            //const hideOnClickCheckbox = page.locator('label]',{hasText:'Hide on click'})
            const hideOnClickCheckbox = page.getByRole('checkbox',{name:'Hide on click'})
            await hideOnClickCheckbox.uncheck({force:true});
            await expect(hideOnClickCheckbox).not.toBeChecked()
            //allCheck
            //1. get locator of 3 checkbox, sau khi get thi phai chuyen no ve array--> dung all() + for of
            const allBoxes = page.getByRole('checkbox')

            for (const box of await allBoxes.all()) {
                await box.uncheck({force:true});
                await expect(box).not.toBeChecked()
                
            }

        });
    });

    test('Drop Down List',async({page})=>{
        const dropDownMenu = page.locator('nb-layout-header nb-select')
        await dropDownMenu.click();
        const optionList =page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
          //await page.locator('[ng-reflect-value="dark"]').click();
        await optionList.filter({hasText:'Dark'}).click()
        const optionValue = await dropDownMenu.textContent();
        expect(optionValue).toEqual(' Dark');

    });

    test('Drop Down List Dynamic',async({page})=>{
        const dropDownMenu = page.locator('nb-layout-header nb-select')
        await dropDownMenu.click();
        const optionList =page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        //await page.locator('[ng-reflect-value="dark"]').click();
        await optionList.filter({hasText:'Cosmic'}).click()
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');
        const colors ={
            Light: 'rgb(255, 255, 255)',
            Dark: 'rgb(34, 43, 69)',
            Cosmic: 'rgb(50, 50, 89)',
            Corporate:'rgb(255, 255, 255)'
        };
        //2. check value
        // await dropDownMenu.click();
        for (const color in colors) {
            await dropDownMenu.click();
            await optionList.filter({hasText:color}).click();
            const optionValue = await dropDownMenu.textContent();
            expect(optionValue.trim()).toEqual(color);
        }
        //1. check color
        // await dropDownMenu.click();
        for (const color in colors) {
            await dropDownMenu.click();
            await optionList.filter({hasText:color}).click();
            const header = page.locator('nb-layout-header')
            await expect(header).toHaveCSS('background-color',colors[color])
           
        // if(color != 'Corporate'){
        //     await dropDownMenu.click();
        // }
        };
    });

    test('tooltip',async({page})=>{
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Tooltip').click();
        const tooltipCard = page.locator('nb-card',{hasText:'Tooltip Placements'});
        const tooltipTop = tooltipCard.locator('button',{hasText:'Top'})
        await tooltipTop.hover();
        const tooltipValue = await page.locator('nb-tooltip').textContent()
        expect(tooltipValue).toEqual('This is a tooltip')
    });

    test('Dialog Boxes',async({page})=>{
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();
        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?');
            dialog.accept()
        })
        await page.locator('.nb-trash').first().click();
        const firstRow = page.locator('table tr').first();
        expect(firstRow).not.toHaveText('mdo@gmail.com')
    });

    test('Tables',async({page})=>{
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();
        await page.locator('table tr',{hasText:'mdo@gmail.com'}).click()

    })


    




})
