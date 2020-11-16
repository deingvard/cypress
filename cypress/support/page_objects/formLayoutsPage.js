export class FormLayoutsPage {

    submitInlineFormWithNameAndEmail(name, email) {
        cy.contains('nb-card', 'Inline form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wrap(form).submit()
        })
    }

    submitBasicFormWithEmailAndPassword(email, password) {
        cy.contains('nb-card', 'Basic form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wrap(form).submit()
        })
    }

    submitFormLayout(){
        cy.contains('nb-card', 'Using the Grid').find('form').then(form => {
            cy.wrap(form).get('[data-cy="signInButton"]')
            cy.wrap(form).contains('Sign in')
            cy.wrap(form).contains('[status="primary"]', 'Sign in')
            cy.wrap(form).get('#inputEmail3')
            cy.wrap(form).find('button')
            cy.wrap(form).should('contain', 'Sign in')
        })
    }

}

export const onFormLayoutsPage = new FormLayoutsPage()