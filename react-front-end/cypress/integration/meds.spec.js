describe("Medications, user can add, edit and delete", () => {

  beforeEach(() => {
    cy.visit("/");

    cy.contains("Log In").click();

    cy.get("[data-testid=email-input]").type("rachel@email.com");
    cy.get("[data-testid=password-input]").type("password");

    cy.contains("LOGIN").click();

  });

  it("should add a new medication", () => {

    cy.wait(1000);

    cy.contains("Medications").click();

    cy.contains("New").click();

    cy.get("form").get("input").first().type("2030-02-02");

    cy.get("form").get("[data-testid=med--name-input]").type("New Med Name Test");

    cy.get("form").get("[data-testid=med--nickname-input]").type("NickName Test");

    cy.get("form").get("[data-testid=med--pharmacy-input]").type("New Pharmacy Test");

    cy.get("form").get("[data-testid=med--doctor-input]").type("Dr.Testing");

    cy.get("form").get("[data-testid=med--plus-button]").click();

    cy.get("form").get("[data-testid=med--instructions-input]").type("Test instructions here")

    cy.get("form").get("[name=water]").click();

    cy.contains("Save").click();


  })

  it("should update a medication ", () => {
    cy.wait(1000);

    cy.contains("Medications").click();

    cy.contains("New Med Name Test").click();

    cy.contains("Edit").click();

    cy.contains("New Med Name Test").clear().type("Updated Med Test");

    cy.contains("Save").click();


  })

  it("should delete a medication", () => {
    cy.wait(1000);

    cy.contains("Medications").click();

    cy.contains("Updated Med Test").click();

    cy.contains("Delete").click();

  })


})