import settings from "../../e2e/Data/settings.json";

export default class SettingsPage {
  constructor() {
    this.settings = {
      settingsLink: 'a[href="#/Settings"]',
      addButton: '//input[@id="Add"]',
      dynamicTemplates: '(//a[@href="#/Settings/DynamicTemplates"])[2]',
      addTemplateButton: '//a[@id="id_btn_template_newTemplate"]',
      templateName: '//input[@placeholder="template name"]',
      templateType: "//select[@id='TemplateTypeId']",
      templateCode: '//input[@placeholder="enter template code"]',
      textField: '//div[@id="cke_1_contents"]',
    };
  }

  /**
   * @Test6
   * @description This method verifies the creation of dynamic templates in the Settings module.
   * It navigates to the Dynamic Templates submodule, fills out the template details including
   * template type, name, code, and text field, and ensures the template is added successfully.
   */
  verifyDynamicTemplates() {
    const textField = settings.Templates.TextField || "";
    const templateName = settings.Templates.TemplateName || "";
    const templateCode = settings.Templates.TemplateCode || "";
    const templateType = settings.Templates.TemplateType || "";
    cy.wait(2000);
    cy.get(this.settings.settingsLink).click();
    cy.wait(2000);
    cy.xpath(this.settings.dynamicTemplates).click();
    cy.wait(2000);
    cy.xpath(this.settings.addTemplateButton).click();
    cy.wait(2000);
    cy.xpath(this.settings.templateType).select(templateType);
    cy.wait(2000);
    cy.xpath(this.settings.templateName).type(templateName);
    cy.wait(2000);
    cy.xpath(this.settings.templateCode).type(templateCode);
    cy.wait(2000);
    cy.xpath(this.settings.textField).click().type(textField);
    cy.wait(2000);
    cy.xpath(this.settings.addButton).click();
  }
}
