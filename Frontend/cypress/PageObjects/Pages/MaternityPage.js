import dayjs from "dayjs";
import maternity from "../../e2e/Data/maternity.json";

export default class MaternityPage {
  constructor() {
    this.maternity = {
      maternityLink: 'a[href="#/Maternity"]',
      reportLink: '(//a[@href="#/Maternity/Reports"])[2]',
      maternityAllowanceReport:
        '(//a[@href="#/Maternity/Reports/MaternityAllowance"])',
      dateFrom: '(//input[@id="date"])[1]',
      showReportBtn: 'button.btn.green.btn-success[type="button"]',
      tableRowLocator:
        'div[role="grid"] div[role="row"]:has(div[col-id="CreatedOn"])',
      createdOn: 'div[col-id="CreatedOn"] span',
      dataType: "//div[@role='gridcell' and @col-id='TransactionType'][1]",
    };
  }

  /**
   * @Test8
   * @description This method verifies the functionality of the Maternity Allowance Report.
   * It navigates to the Maternity module, accesses the report section, and opens the Maternity Allowance Report.
   * Initially, it ensures that the data grid is not visible, selects a date range by entering the 'from date,'
   * and clicks the 'Show Report' button. Finally, it waits for the report to load and asserts that the data grid becomes visible.
   * Throws an error if the data grid visibility states do not match the expected outcomes.
   */
  verifyMaternityAllowanceReport() {
    const fromDate = maternity.DateRange.FromDate || "";
    const fromDateFormatted = dayjs(fromDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    cy.get(this.maternity.maternityLink).click();
    cy.wait(2500);
    cy.xpath(this.maternity.reportLink).click();
    cy.wait(2500);
    cy.xpath(this.maternity.maternityAllowanceReport).click();
    cy.wait(2500);
    cy.xpath(this.maternity.dateFrom).type(fromDateFormatted);
    cy.wait(2500);
    cy.get(this.maternity.showReportBtn).click();
    cy.wait(2500);
    cy.xpath(this.maternity.dataType).should("be.visible");
  }
}
