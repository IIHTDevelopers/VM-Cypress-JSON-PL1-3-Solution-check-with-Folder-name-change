import doctor from "../../e2e/Data/doctor.json";

export default class DoctorsPage {
  constructor() {
    this.doctorsLink = 'a[href="#/Doctors"]';
    this.inpatientDepartmentTab = '(//a[@href="#/Doctors/InPatientDepartment"])[2]';
    this.searchBar = "(//input[@placeholder='search'])[3]";
    this.orderDropdown = "//select";
    this.imagingActionButton = '//a[@danphe-grid-action="imaging"]';
    this.searchOrderItem = '//input[@placeholder="search order items"]';
    this.proceedButton = '//button[contains(text(),"Proceed")]';
    this.signButton = '//button[text()="Sign"]';
    this.successMessage = '//p[contains(text(),"success")]/../p[text()="Imaging and lab order add successfully"]';
  }

  /**
   * @Test9
   * @description This method verifies the process of placing an imaging order for an inpatient.
   * It navigates to the Inpatient Department, searches for a specific patient, selects an imaging action,
   * chooses an order type, specifies the order item, and completes the process by signing the order.
   * The method confirms the successful placement of the order by verifying the success message.
   */
  performInpatientImagingOrder() {
    const patient = doctor.patientName;
    const option = doctor.Dropdown.Option;
    const searchOrderItem = doctor.Dropdown.searchOrderItem;

    // Step 1: Click on the "Doctors" link
    cy.get(this.doctorsLink).click();

    // Step 2: Click on the "Inpatient Department" tab
    cy.xpath(this.inpatientDepartmentTab).click();
    cy.wait(2000); // Wait for 2 seconds

    // Step 3: Search for the patient
    cy.xpath(this.searchBar).type(patient);
    // cy.get("body").type("{enter}");

    // Step 4: Select the imaging action
    cy.xpath(this.imagingActionButton).click();
    cy.wait(2000); // Wait for 2 seconds

    // Step 5: Choose the order type
    cy.xpath(this.orderDropdown).select(option);
    cy.wait(2000); // Wait for 2 seconds

    // Step 6: Specify the order item
    cy.xpath(this.searchOrderItem).type(searchOrderItem);
    cy.get("body").type("{enter}");

    // Step 7: Proceed with the order
    cy.xpath(this.proceedButton).click();
    // cy.xpath(this.proceedButton).type("{enter}");

    // Step 8: Sign the order
    cy.xpath(this.signButton).click();
    cy.wait(2000); // Wait for 2 seconds

    // Step 9: Verify the success message
    cy.xpath(this.successMessage)
      .should("be.visible")
      .then(($successMessage) => {
        expect($successMessage.text().trim()).to.equal("Imaging and lab order add successfully");
      });
  }
}