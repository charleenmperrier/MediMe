/* global cy */

describe("User can add, edit and delete vacccination and vaccination dose", () => {
  it("should log in", () => {
    cy.visit("/");

    cy.contains(/log in/i).click();

    cy.get("[data-testid=email-input]").type("rachel@email.com");
    cy.get("[data-testid=password-input]").type("password");

    cy.contains("LOGIN").click();
  });

  it("should add a new vaccination only", () => {
    cy.contains("Vaccinations").click();

    cy.contains(/new/i).click();

    cy.get("[data-testid=vaccine-input]").type("AstraZeneca");

    cy.contains(/save/i).click();

    cy.contains("Vaccination Record Saved!").should("exist");

    cy.contains("Skip for now").click();

    cy.contains(".card--vaccination", "AstraZeneca").should("exist");
  });

  it("should add a new vaccination and a new dose", () => {
    cy.contains(/new/i).click();

    cy.get("[data-testid=vaccine-input]").type("Moderna");

    cy.get("[data-testid=vax--plus-button]").click();

    cy.contains(/save/i).click();

    cy.contains("Vaccination Record Saved!").should("exist");

    cy.contains(/enter dosage info/i).click();

    cy.get("form").get("input").first().type("2030-02-02");

    cy.get("[data-testid=dose--serial]").type("FIRSTSERIAL#");

    cy.get("[data-testid=dose--site]").type("Pure Integrative Pharmacy");

    cy.contains("Save").click();

    cy.contains(".card--vaccination", "Moderna").should("exist");
  });

  it("should add a new dose from the summary page", () => {
    cy.contains("Moderna").click();

    cy.contains(/new dose/i).click();

    cy.get("form").get("input").first().type("2030-04-01");

    cy.get("[data-testid=dose--serial]").type("SECONDSERIAL#");

    cy.get("[data-testid=dose--site]").type("Pure Integrative Pharmacy");

    cy.contains("Save").click();

    cy.contains(".card--vaccination", "Moderna").should("exist");

    cy.contains("Moderna").click();

    cy.contains("Apr 01 2030").should("exist");
  });

  it("should edit a vaccination dose", () => {
    cy.contains("Dose 2/2").click();

    cy.contains(/edit/i).click();

    cy.get("form").get("input").first().clear().type("2030-05-01");

    cy.contains("SECONDSERIAL#").clear().type("THIRDSERIAL#");

    cy.contains(/save/i).click();

    cy.get(".dose-detail--data").contains("THIRDSERIAL#");

    cy.get("[data-testid=back-button]").click();

    cy.contains(".card--vaccination", "Moderna").click();
    cy.contains("Dose 2/2").should("exist");
    cy.contains("May 01 2030").should("exist");
  });

  it("should delete a vaccination dose", () => {
    cy.contains("Dose 2/2").click();

    cy.contains("Vaccination Dose Detail").should("exist");

    cy.contains("THIRDSERIAL#").should("exist");

    cy.contains(/delete/i).click();

    cy.contains("Vaccinations").should("exist");

    cy.contains(".card--vaccination", "Moderna").click();

    cy.contains(/May 01 2030/i).should("not.exist");

    cy.get("[alt=logo]").click();

    cy.contains("Rachel Greene").should("exist");

    cy.contains("Rachel Greene").click();
  });
});
