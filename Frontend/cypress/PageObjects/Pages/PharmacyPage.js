import pharmacy from "../../e2e/Data/pharmacy.json";

export default class PharmacyPage {
  constructor() {
    this.pharmacy = {
      pharmacyModule: 'a[href="#/Pharmacy"]',
      orderLink: '//a[contains(text(),"Order")]',
      addNewGoodReceiptButton:
        "//button[contains(text(),'Add New Good Receipt')]",
      goodReceiptModalTitle: `//span[contains(text(),"Add Good Receipt")]`,
      printReceiptButton: `//button[@id="saveGr"]`,
      addNewItemButton: `//button[@id="btn_AddNew"]`,
      itemNameField: `//input[@placeholder="Select an Item"]`,
      batchNoField: '//input[@id="txt_BatchNo"]',
      itemQtyField: '//input[@id="ItemQTy"]',
      rateField: '//input[@id="GRItemPrice"]',
      saveButton: '//button[@id="btn_Save"]',
      supplierNameField: '//input[@id="SupplierName"]',
      invoiceField: '//input[@id="InvoiceId"]',
      successMessage:
        '//p[contains(text(),"success")]/../p[text()="Goods Receipt is Generated and Saved."]',
      supplierName: '//input[@placeholder="select supplier"]',
      showDetails: '//button[text()=" Show Details "]',
    };
  }

  /**
   * @Test1
   * @description This method navigates to the Pharmacy module, verifies the Good Receipt modal,
   * handles alerts during the Good Receipt print process, and ensures the modal is visible
   * before performing further actions.
   */
  handlingAlertOnRadiology() {
    // Step 1: Highlight and click on the "Pharmacy Module"
    cy.get(this.pharmacy.pharmacyModule).click();

    // Step 2: Highlight and click on the "Order Link"
    cy.xpath(this.pharmacy.orderLink).click();

    // Step 3: Click the "Add New Good Receipt" button
    cy.xpath(this.pharmacy.addNewGoodReceiptButton).click();

    // Step 4: Verify the "Good Receipt Modal" is visible
    cy.xpath(this.pharmacy.goodReceiptModalTitle)
      .should("be.visible")
      .then((isVisible) => {
        if (isVisible) {
          console.log("Good Receipt Modal is visible.");
        } else {
          throw new Error("Good Receipt Modal is not visible.");
        }
      });

    // Step 5: Click on the "Print Receipt" button
    cy.xpath(this.pharmacy.printReceiptButton).click();

    // Step 6: Handle the alert
    cy.on("window:confirm", (alertMessage) => {
      console.log(`Alert message: ${alertMessage}`);
      if (
        alertMessage.includes(
          "Changes will be discarded. Do you want to close anyway?"
        )
      ) {
        console.log("Alert accepted.");
        return true; // Accept the alert
      } else {
        console.log("Alert dismissed.");
        return false; // Dismiss the alert
      }
    });
  }

  /**
   * @Test2
   * @description This method verifies the process of adding a new Good Receipt in the Pharmacy module,
   * filling in item details such as item name, batch number, quantity, rate, supplier name,
   * and a randomly generated invoice number. It concludes by validating the successful printing of the receipt.
   */

  verifyPrintReceipt() {
    const itemName = pharmacy.Fields.ItemName || "";
    const batchNoField = pharmacy.Fields.BatchNoField || "";
    const itemQtyField = pharmacy.Fields.ItemQtyField || "";
    const rateField = pharmacy.Fields.RateField || "";
    const supplierNameField = pharmacy.Fields.SupplierNameField || "";
    
    cy.wait(2000);
    cy.get(this.pharmacy.pharmacyModule).click();
    cy.xpath(this.pharmacy.orderLink).click();
    cy.xpath(this.pharmacy.addNewGoodReceiptButton).click();
    cy.xpath(this.pharmacy.addNewItemButton).click();
    cy.wait(2000);
    cy.xpath(this.pharmacy.itemNameField).click().type(itemName);
    cy.get("body").type("{enter}");
    cy.wait(2000);
    cy.xpath(this.pharmacy.batchNoField).type(batchNoField);
    cy.get("body").type("{enter}");
    cy.wait(2000);
    cy.xpath(this.pharmacy.itemQtyField).type(itemQtyField);
    cy.get("body").type("{enter}");
    cy.wait(2000);
    cy.xpath(this.pharmacy.rateField).type(rateField);
    cy.get("body").type("{enter}");
    cy.wait(2000);
    cy.xpath(this.pharmacy.saveButton).click();
    cy.xpath(this.pharmacy.supplierNameField).click().type(supplierNameField);
    cy.get("body").type("{enter}");
    cy.wait(2000);
    const randomInvoiceNo = Math.floor(100 + Math.random() * 900).toString();
    cy.xpath(this.pharmacy.invoiceField).type(randomInvoiceNo);
    cy.xpath(this.pharmacy.printReceiptButton).click();
    cy.xpath(this.pharmacy.successMessage).should("be.visible");
  }

  /**
   * @Test13
   * @description This method verifies the presence of a supplier name in the order section of the Pharmacy module.
   * It navigates through the necessary elements to input the supplier name, triggers the search, and then checks if
   * the supplier name appears in the results grid. If the supplier name is not found, it throws an error.
   */
  verifypresenceOfSupplierName() {
    const supplierNameField = pharmacy.Fields.SupplierNameField || "";
    cy.wait(2000);
    cy.get(this.pharmacy.pharmacyModule).click();
    cy.xpath(this.pharmacy.orderLink).click();
    cy.xpath(this.pharmacy.supplierName).click().type(supplierNameField);
    cy.get("body").type("{enter}");
    cy.xpath(this.pharmacy.showDetails).click();

    cy.get(`div[col-id="SupplierName"]`).not(':first').each(($cell) => {
      cy.wrap($cell).invoke("text").then((text) => {
        expect(text.trim()).to.equals(supplierNameField.trim());
      });
    });
  }
}
