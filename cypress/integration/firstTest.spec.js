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
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emailLabel = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabel = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabel).to.equal('Email')
            expect(passwordLabel).to.equal('Password')
        })

        cy.contains('nb-card', 'Basic form').then( secondForm => {
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
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
        })

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
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
    it.only('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('13').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Nov 13, 2020')
        })
    })
})
