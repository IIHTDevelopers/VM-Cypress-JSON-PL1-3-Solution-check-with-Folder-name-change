import data from "../../e2e/Data/PatientName.json";

export default class IncentivePage {
    constructor() {
        this.incentive = {
            incentiveLink: 'a[href="#/Incentive"]',
            settingsTab: 'ul[class="page-breadcrumb"] a[href="#/Incentive/Setting"]',
            searchBar: 'input#quickFilterInput',
            editTDSButton: 'a[danphe-grid-action="edit-tds"]',
            editTDSModal: 'div.modal[title="Edit TDS Percent"]',
            tdsInputField: 'input[type="number"]',
            updateTDSButton: 'button#btn_GroupDistribution',
            tdsValueInTable: 'div[col-id="TDSPercent"]',
        };
    }

    /**
     * @Test9
     * @description This method updates the TDS% for a specific employee and verifies the updated value in the table.
     * @expected
     * The updated TDS% value is displayed correctly in the corresponding row of the table.
     */

    editTDSForEmployee() {
        const patientName = data.PatientNames[2].Patient3 || "";
        const updatedTDS = Math.floor(Math.random() * 99);
        cy.log(`calculated tds > ${String(updatedTDS)}`);

        // Step 1: Click on the "Incentive" link
        cy.get(this.incentive.incentiveLink).click();

        // Step 2: Click on the "Settings" tab
        cy.get(this.incentive.settingsTab).click();

        // Step 3: Type the patient name in the search bar
        cy.get(this.incentive.searchBar).type(patientName, { delay: 100 });

        // Step 4: Locate the employee row and click "Edit TDS%"
        cy.get(this.incentive.editTDSButton).click();

        // Step 5: Update the TDS% value
        cy.get(this.incentive.tdsInputField).clear();
        cy.get(this.incentive.tdsInputField).type(String(updatedTDS));

        // Step 6: Click on "Update TDS" button
        cy.get(this.incentive.updateTDSButton).click();

        // Step 7: Clear and re-type the patient name in the search bar
        cy.get(this.incentive.searchBar).clear();
        cy.get(this.incentive.searchBar).type(patientName, { delay: 100 });
        cy.wait(2000); // Wait for 2 seconds

        // Step 8: Verify the updated TDS% value in the table
        cy.get(this.incentive.tdsValueInTable)
            .eq(1)
            .invoke("text")
            .then((displayedTDS) => {
                expect(displayedTDS.trim()).to.equal(String(updatedTDS));
            });
    }
}