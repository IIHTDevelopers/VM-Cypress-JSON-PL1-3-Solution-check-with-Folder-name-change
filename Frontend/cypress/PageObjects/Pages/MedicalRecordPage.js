import dayjs from "dayjs";
import medicalRecord from "../../e2e/Data/medicalRecord.json";

export default class MedicalRecordsPage {
  constructor() {
    this.medicalRecord = {
      medicalRecordsLink: 'a[href="#/Medical-records"]',
      mrOutpatientList: '(//a[@href="#/Medical-records/OutpatientList"])[2]',
      okButton: '//button[@class="btn green btn-success"]',
      searchBar: "#quickFilterInput",
      fromDate: `(//input[@id="date"])[1]`,
      doctorFilter: '//input[@placeholder="Doctor Name"]',
    };
  }

  /**
   * @Test4
   * @description This method verifies patient records in the Dispensary module by applying a date filter
   * and searching for a specific patient by gender. It validates the search results by checking if the
   * gender appears in the filtered records.
   */
  keywordMatching() {
    const fromDate = medicalRecord.DateRange.FromDate || "";
    const fromDateFormatted = dayjs(fromDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const gender = medicalRecord.PatientGender.Gender || "";
    cy.get(this.medicalRecord.medicalRecordsLink).click();
    cy.xpath(this.medicalRecord.mrOutpatientList).click();
    cy.wait(2000);
    cy.xpath(this.medicalRecord.fromDate).click().type(fromDateFormatted);
    cy.wait(1000);
    cy.xpath(this.medicalRecord.okButton).click();
    cy.wait(2000);
    console.log(`Verifying patient: ${gender}`);
    cy.get(this.medicalRecord.searchBar).click().type(gender);
    cy.get("body").type("{enter}");
    cy.wait(3000);
    cy.xpath('//div[@role="gridcell" and @col-id="Gender"]').then(
      (elements) => {
        const resultText = elements
          .map((_, el) => Cypress.$(el).text().trim())
          .get();
        const matchFound = resultText.includes(gender.trim());
        if (matchFound) {
          console.log("Patient found in search results.");
        } else {
          throw new Error("Patient not found in search results.");
        }
      }
    );
  }

  /**
   * @Test5
   * @description This method verifies the presence of the doctor filter functionality in the medical records module.
   * It applies the filter by selecting a specific doctor and a date range, and validates that the search results
   * correctly display records associated with the selected doctor.
   */
  presenceOfDoctorFilter() {
    const fromDate = medicalRecord.DateRange.FromDate || "";
    const fromDateFormatted = dayjs(fromDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const doctor = medicalRecord.DoctorName.Doctor || "";

    cy.get(this.medicalRecord.medicalRecordsLink).click();
    cy.xpath(this.medicalRecord.mrOutpatientList).click();
    cy.wait(2000);
    cy.xpath(this.medicalRecord.doctorFilter).click().type(doctor);
    cy.xpath(this.medicalRecord.fromDate).type(fromDateFormatted);
    cy.xpath(this.medicalRecord.okButton).click();
    cy.wait(3000);
    cy.xpath("//div[@role='gridcell' and @col-id='PerformerName']").then(
      ($cells) => {
        const resultText = $cells
          .map((i, el) => Cypress.$(el).text().trim())
          .get();
        const matchFound = resultText.includes(doctor.trim());

        expect(matchFound).to.be.true;
      }
    );
    cy.wait(3000);
  }
}
