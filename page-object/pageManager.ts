import { Page } from "@playwright/test";
import { NavigationPage} from "../page-object/navigationPage";
import { FormLayoutPage } from "../page-object/formLayoutsPage";
import { DatePicker1 } from "../page-object/datepicker";

export class PageManager {
    readonly page: Page
    readonly navigationPage: NavigationPage
    readonly formLayoutPage: FormLayoutPage
    readonly datepicker1: DatePicker1
    
    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutPage = new FormLayoutPage(this.page)
        this.datepicker1 = new DatePicker1(this.page)
    };

    navigationTo (){
        return this.navigationPage
    };
    submitToFormLayoutPage (){
        return this.formLayoutPage
    };
    datepicker (){
        return this.datepicker1
    };


};