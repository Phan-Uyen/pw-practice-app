import {  Page, expect } from "@playwright/test";
export class DatePicker1 {
    readonly page: Page
    constructor(page: Page) {
    this.page =page
    }
    //1.Form Picker
    async selectdatepickerFromToday(numberOfDayFromToday: number){
        const dateShown =this.page.locator('[placeholder="Form Picker"]')
        await dateShown.click();
        const dateExpected = await this.selectDateCalender(numberOfDayFromToday);
    await expect(dateShown).toHaveValue(dateExpected)
    }
    //2. Range Picker
    async selectdatepickerWithRangeFromToday(numberOfStartDayFromToday: number,numberOfEndDayFromToday: number){
        const dateShown =this.page.locator('[placeholder="Range Picker"]')
        await dateShown.click();
        const dateStartExpected = await this.selectDateCalender(numberOfStartDayFromToday);
        const dateEndExpected = await this.selectDateCalender(numberOfEndDayFromToday);
        const dateStartEndExpected = `${dateStartExpected} - ${dateEndExpected}`
    await expect(dateShown).toHaveValue(dateStartEndExpected)
    }

private async selectDateCalender (numberOfDayFromToday:number){
    let date = new Date();
    let dateplus = date.getDate()+numberOfDayFromToday;
    date.setDate(dateplus)
    const dayxpected = date.getDate().toString();
    const monthexpectedShort = date.toLocaleString('En-US',{month:'short'})
    const monthexpectedLong = date.toLocaleString('En-US',{month:'long'})
    const yearexpected = date.getFullYear();
    const dateExpected = `${monthexpectedShort} ${dayxpected}, ${yearexpected}`

    let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
    const monthAndYearExpected = `${monthexpectedLong} ${yearexpected}`
    while (!calendarMonthAndYear.includes(monthAndYearExpected)){
    await this.page.locator('[data-name="chevron-right"]').click();
    calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    }
    // if(dateExpected<25) {
    //     await this.page.locator('.day-cell.ng-star-inserted').getByText(dayxpected,{exact:true}).nth).click();

    // }
    // if(date<10) {
    // await this.page.locator('.day-cell.ng-star-inserted').getByText(dayxpected,{exact:true}).nth(0).click();

    // }
    await this.page.locator('.day-cell.ng-star-inserted').getByText(dayxpected,{exact:true}).nth(1).click();

    
    return dateExpected;
}
}