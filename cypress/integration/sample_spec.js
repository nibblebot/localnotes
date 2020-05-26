describe("My First Test", () => {
  it("Does not do much!", () => {
    cy.visit("/")

    // add 1st note
    cy.get("[data-testid=editable-note]").type("Cypress")
    cy.get("[data-testid=note-list-item] strong").should("contain", "Cypress")
    cy.get("[data-testid=editable-note]").type(
      "Cypress is better than Selenium"
    )
    cy.get("[data-testid=note-list-item] strong").should("contain", "Selenium")

    // add 2nd note
    cy.get("[data-testid=new-note]").click()
    cy.get("[data-testid=editable-note]").type("Cypress is cool")
    cy.get("[data-testid=note-list-item] strong").should("have.length", 2)
    // new notes get prepended to list
    cy.get("[data-testid=note-list-item]:first-child strong").should(
      "contain",
      "cool"
    )
    // delete both notes
    cy.get("[data-testid=delete-note]").click()
    cy.get("[data-testid=note-list-item]").click()
    cy.get("[data-testid=delete-note]").click()
    cy.get("[data-testid=note-list-item] strong").should("not.exist")
  })
})
