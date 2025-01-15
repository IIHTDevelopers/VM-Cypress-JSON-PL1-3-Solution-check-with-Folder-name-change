import subStore from "../../e2e/Data/subStore.json";

export default class SubstorePage {
  constructor() {
    this.substore = {
      wardSupplyLink: 'a[href="#/WardSupply"]',
      substore: '//i[text()="Accounts"]',
      inventoryRequisitionTab: '//a[text()="Inventory Requisition"]',
      createRequisitionButton: '//span[text()="Create Requisition"]',
      targetInventoryDropdown: '//input[@id="activeInventory"]',
      itemNameField: '//input[@placeholder="Item Name"]',
      requestButton: '//input[@value="Request"]',
      successMessage:
        '//p[contains(text(),"success")]/../p[text()="Requisition is Generated and Saved"]',
      accountBtn:
        '//span[contains(@class, "report-name")]/i[contains(text(), "Accounts")]',
      printButton: '//button[@id="printButton"]',
      consumptionLink: '(//a[@href="#/WardSupply/Inventory/Consumption"])',
      newConsumptionBtn:
        '//span[contains(@class, "glyphicon") and contains(@class, "glyphicon-plus")]',
      inputItemName: "#itemName0",
      saveBtn: "#save",
      successMessage1:
        '//p[contains(text()," Success ")]/../p[text()="Consumption completed"]',
      reportLink: '(//a[@href="#/WardSupply/Inventory/Reports"])',
      consumptionReport:
        '//span[contains(@class, "report-name")]/i[contains(text(), "Consumption Report")]',
      subCategory: '//select[@id="selectedCategoryName"]',
      showReport: '//button[contains(text(),"Show Report")]',
      issueField: "//input[@placeholder='Issue No']",
    };
  }

  /**
   * @Test7
   * @description This method verifies the creation of an inventory requisition in the Ward Supply module.
   * It navigates to the Substore section, selects a target inventory, adds an item, and submits the requisition.
   * The method ensures the requisition is successfully created by verifying the success message.
   */
  createInventoryRequisition() {
    const targetInventory = subStore.SubStore.TargetInventory || "";
    const itemName = subStore.SubStore.ItemName || "";
    cy.wait(2000);
    cy.get(this.substore.wardSupplyLink).click();
    cy.xpath(this.substore.substore).click();
    cy.xpath(this.substore.inventoryRequisitionTab).click();
    cy.xpath(this.substore.createRequisitionButton).click();
    cy.wait(2000);
    cy.xpath(this.substore.targetInventoryDropdown).click();
    cy.xpath(this.substore.issueField).click();
    cy.xpath(this.substore.targetInventoryDropdown)
      .click()
      .type(targetInventory);
    cy.get("body").type("{enter}");
    cy.wait(2000);
    cy.xpath(this.substore.itemNameField).type(itemName);
    cy.get("body").type("{enter}");
    cy.wait(2000);
    cy.xpath(this.substore.requestButton).click();
  }

  /**
   * @Test11
   * @description This method creates a new consumption section. It navigates through the Ward Supply module,
   * accesses the account and consumption sections, and opens the "New Consumption" form.
   * The function enters the item name, submits the form, and verifies the successful creation of the consumption
   * section by asserting that a success message becomes visible.
   * Throws an error if the success message is not displayed after submission.
   */
  creatingConsumptionSection() {
    const itemName = subStore.SubStore.ItemName || "";
    cy.wait(2000);
    cy.get(this.substore.wardSupplyLink).click();
    cy.xpath(this.substore.accountBtn).click();
    cy.xpath(this.substore.consumptionLink).click();
    cy.xpath(this.substore.newConsumptionBtn).click();
    cy.get(this.substore.inputItemName).type(itemName);
    cy.get("body").type("{enter}");
    cy.get(this.substore.saveBtn).click();
    cy.wait(3000);
    cy.xpath(this.substore.successMessage1).should("be.visible");
  }

  /**
   * @Test12
   * @description This method creates a new report section in the Ward Supply module. It navigates through
   * the report section and selects the specified item name from the subcategory dropdown. After generating
   * the report, the function verifies if the selected item name is displayed in the report grid.
   * Throws an error if the item name is not found in the report results.
   */

  creatingReportSection() {
    const itemName = subStore.SubStore.ItemName || "";
    cy.wait(2000);
    cy.get(this.substore.wardSupplyLink).click();
    cy.xpath(this.substore.accountBtn).click();
    cy.xpath(this.substore.reportLink).click();
    cy.xpath(this.substore.consumptionReport).click();
    cy.wait(2500);
    // cy.xpath(this.substore.subCategory).click();
    cy.xpath(this.substore.subCategory).select(itemName);
    cy.xpath(this.substore.showReport).click();

    cy.get(`div[col-id="SubCategoryName"]`).not(':first').each(($cell) => {
      cy.wrap($cell).invoke("text").then((text) => {
        expect(text.trim()).to.equals(itemName);
      });
    });
  }
}
