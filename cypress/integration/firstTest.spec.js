/// <reference types="cypress" />

describe('Our first suite', () => {

    it('my first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        // by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        // by tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // The most remommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')

    });

    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')
        cy.contains('Sign in')
        cy.contains('[status="primary"]', 'Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form')
            .find('[type="email"]')

        cy.contains('nb-card', 'Block form')
            .find('[placeholder="Website"]')
    })

    it('then and wrap methods', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')

        //cypress style
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabel = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabel = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabel).to.equal('Email')
            expect(passwordLabel).to.equal('Password')
        })

        cy.contains('nb-card', 'Basic form').then(secondForm => {
            const emailLabel = secondForm.find('[for="exampleInputEmail1"]').text()
            const passwordLabel = secondForm.find('[for="exampleInputPassword1"]').text()
            expect(emailLabel).to.equal('Email address')
            expect(passwordLabel).to.equal('Password')

            cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
        })

    })

    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        // Verify checkbox is selected
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked')
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })
    });

    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('14').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Nov 14, 2020')
        })
    })

    // For hidden attribute
    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                // by index element (second in list elements)
                .eq(1)
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                // verify first radiobutton is not checked
                .first()
                .should('not.be.checked')

            cy.wrap(radioButtons)
                //verify radiobutton disabled
                .eq(2)
                .should('be.disabled')
        })
    })

    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({force: true}) // select all options
        cy.get('[type="checkbox"]').eq(0).click({force: true}) // {force: true} - for hidden elements
        cy.get('[type="checkbox"]').eq(0).check({force: true})
    })

    // Dropdown and select
    it('lists and dropdowns', () => {
        cy.visit('/')

        // 1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        // 2 List of the elements
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => { // same foreach loop
                const itemText = listItem.text().trim() // cut free spaces before text

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])

                if (index < 3) {
                    cy.wrap(dropdown).click()
                }
            })
        })
    })

    it.only('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1 edit and update current row in table
        cy.get('tbody').contains('tr', 'John').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('30')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '30') // eq it's by index element
        })

        // 2 add new row in the table
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Sasha')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bond')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        // Verify previous created row
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Sasha')
            cy.wrap(tableColumns).eq(3).should('contain', 'Bond')
        })

        // 3 Filter rows by value (inserted into cell search value)
        // Added wait (sleep)
        const age = [20, 30, 40, 4143234] // with not existing value
        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500) // sleep
            cy.get('tbody tr').each(tableRow => {
                if (age == 4143234) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })


    })
})
