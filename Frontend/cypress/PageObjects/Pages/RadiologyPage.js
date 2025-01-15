import dayjs from "dayjs";
import radiology from "../../e2e/Data/radiology.json";

export default class RadiologyPage {
  constructor() {
    this.radiology = {
      radiologyModule: 'a[href="#/Radiology"]',
      listRequestSubModule: '//a[contains(text(),"List Requests")]',
      filterDropdown: "//select",
      fromDate: `(//input[@id="date"])[1]`,
      toDate: `(//input[@id="date"])[2]`,
      okButton: `//button[contains(text(),"OK")]`,
      addReportButton: '(//a[contains(text(),"Add Report")])[1]',
      closeModalButton: `a[title="Cancel"]`,
      dateRangeDropdown: "//span[@data-toggle='dropdown']",
      last3MonthsOption: "//a[text()= 'Last 3 Months']",
      dateCells: "//div[@role='gridcell' and @col-id='CreatedOn'][1]",
    };
  }

  /**
   * @Test3
   * @description This method verifies that the data displayed in the radiology list request is within the last three months.
   * It navigates to the Radiology module, selects the "Last 3 Months" option from the date range dropdown, and confirms the filter.
   * The method retrieves all dates from the table, validates their format, and checks if they fall within the last three months.
   * Logs detailed errors if dates are invalid or out of range and provides debug information about the number of date cells and retrieved dates.
   * Throws an error if any date is invalid or outside the range.
   */
  verifyDataWithinLastThreeMonths() {
    try {
      cy.get(this.radiology.radiologyModule).click();
      cy.xpath(this.radiology.listRequestSubModule).click();
      cy.xpath(this.radiology.dateRangeDropdown).click();
      cy.xpath(this.radiology.last3MonthsOption).click();
      cy.xpath(this.radiology.okButton).click();
      cy.xpath(this.radiology.dateCells).then((dateCells) => {
        const debugElements = dateCells.length;
        console.log("Number of date cells found:", debugElements);
        if (debugElements === 0) {
          throw new Error(
            "No date cells found. Verify the locator or table data."
          );
        }
        const dateTexts = dateCells
          .map((index, element) => {
            return Cypress.$(element).text().trim();
          })
          .get();
        console.log("Retrieved dates:", dateTexts);
        const today = new Date();
        const threeMonthsAgo = new Date(
          today.getFullYear(),
          today.getMonth() - 3,
          today.getDate()
        );
        let isAllDatesValid = true;
        dateTexts.forEach((dateText) => {
          const dateValue = new Date(dateText);
          if (isNaN(dateValue.getTime())) {
            console.error(`Invalid date format: ${dateText}`);
            isAllDatesValid = false;
          } else if (dateValue < threeMonthsAgo || dateValue > today) {
            console.error(`Date out of range: ${dateValue}`);
            isAllDatesValid = false;
          }
        });
        if (isAllDatesValid) {
          console.log("All dates are within the last 3 months.");
        } else {
          throw new Error(
            "Some dates are outside the last 3 months range or invalid."
          );
        }
      });
    } catch (error) {
      console.error(
        'Error selecting "Last 3 Months" from the dropdown:',
        error
      );
    }
  }

  /**
   * @Test10
   * @description This method filters the list of radiology requests based on a specified date range and imaging type.
   * It navigates to the Radiology module, applies the selected filter, enters the 'From' and 'To' dates, and confirms the filter action.
   * The method verifies that the filtered results match the specified imaging type.
   */
  filterListRequestsByDateAndType() {
    const filter = radiology.FilterDropdown.Filter || "";
    const fromDate = radiology.DateRange.FromDate || "";
    const fromDateFormatted = dayjs(fromDate, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        );
    const toDate = radiology.DateRange.ToDate || "";
    const toDateFormatted = dayjs(toDate, "DD-MM-YYYY").format("YYYY-MM-DD");
    cy.wait(2000);
    cy.get(this.radiology.radiologyModule).click();
    cy.wait(3000);
    cy.xpath(this.radiology.listRequestSubModule).click();
    cy.wait(3000);
    cy.xpath(this.radiology.filterDropdown).select(filter);
    cy.wait(2000);
    cy.xpath(this.radiology.fromDate).type(fromDateFormatted);
    cy.wait(3000);
    cy.xpath(this.radiology.toDate).type(toDateFormatted);
    cy.xpath(this.radiology.okButton).click();
    cy.wait(3000);
    cy.xpath("//div[@role='gridcell' and @col-id='ImagingTypeName']").then(
      ($cells) => {
        const resultText = $cells
          .map((i, el) => Cypress.$(el).text().trim())
          .get();
        const matchFound = resultText.includes(filter.trim());
        expect(matchFound).to.be.true;
      }
    );
  }
}
