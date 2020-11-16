import {navigateTo} from "../support/page_objects/navigationPage";
import {onFormLayoutsPage} from "../support/page_objects/formLayoutsPage";
import {onDatePickerPage} from "../support/page_objects/datepickerPage";
import {onSmartTablePage} from "../support/page_objects/smartTablePage";

describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        // cy.visit('/')
        cy.openHomePage()
    })

    it('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
    });

    it.only('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Sasha', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', "password")

        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitFormLayout()

        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(2)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 15)

        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Sasha', 'Bond')
        onSmartTablePage.updateAgeByFirstName('Sasha', '40')
        onSmartTablePage.deleteRowByIndex(1)
    });

});