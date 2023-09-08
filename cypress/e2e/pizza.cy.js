describe('my form', () => {
      beforeEach(() => {
            cy.visit('http://localhost:3000/pizza')
      })
      it('can submit a valid form', () => {
            cy.get('[data-id="name-input"]').type('Jamellen')
                  .should('include.text', 'Jamellen') 
            cy.contains('ham').click()
            cy.contains('pineapple').click()
            cy.get('form').submit()
      })
    })