import loginData from "../../e2e/Data/login.json";

class LoginPage {
  user = "#username_id";
  pass = "#password";
  signIn = "#login";
  errorMsg = "//div[contains(text(),'Invalid credentials !')]";
  admin = "//li[@class='dropdown dropdown-user']";
  logout = "//a[text() = ' Log Out ']";

  /**
   * @Test0 This method logs in the user with valid credentials.
   *
   * @description This method performs the login operation using the provided valid credentials. It highlights the input
   *              fields for better visibility during interaction and fills the username and password fields. After submitting
   *              the login form by clicking the login button, it validates the success of the login process. The login is
   *              considered successful if there are no errors.
   */
  performLogin() {
    try {
      // Access login data from JSON
      const username = loginData.ValidLogin.ValidUserName;
      const password = loginData.ValidLogin.ValidPassword;

      // Fill username
      cy.get(this.user).clear().type(username);

      // Fill password
      cy.get(this.pass).clear().type(password);

      // Click sign-in button
      cy.get(this.signIn).click();

      // Verify successful login by checking if the 'admin' element is visible
      cy.xpath(this.admin).should("be.visible");
    } catch (e) {
      cy.log("Error during login:", e.message);
      throw e; // Rethrow the error for test failure
    }
  }

  /**
   * @Test14
   * @description This method verifies the logout functionality from the Admin dropdown.
   * @expected
   * User is logged out successfully and the login page is displayed.
   */
  verifyLogoutFunctionality() {
    cy.wait(5000);
    cy.xpath(this.admin).click();
    cy.xpath(this.logout).click();
    cy.get(this.signIn).should("be.visible");
  }

  /**
   * @Test15 This method attempts login with invalid credentials and retrieves the resulting error message.
   *
   * @param username - The username to use for the login attempt.
   * @param password - The password to use for the login attempt.
   * @description Tries logging in with incorrect credentials to verify the login error message display.
   *              Highlights each input field and the login button during interaction. Captures and returns
   *              the error message displayed upon failed login attempt.
   *
   */
  performLoginWithInvalidCredentials() {
    try {
      const invalidUserName = loginData.InvalidLogin.InvalidUserName || "";
      const invalidPassword = loginData.InvalidLogin.InvalidPassword || "";

      cy.wait(2000);

      cy.xpath(this.admin).then(($admin) => {
        if ($admin.is(":visible")) {
          cy.xpath(this.admin).click();
          cy.xpath(this.logout).click();
        }
      });

      cy.get(this.user).clear().type(invalidUserName);
      cy.get(this.pass).clear().type(invalidPassword);
      cy.get(this.signIn).click();
      cy.xpath(this.errorMsg).should("be.visible");
    } catch (e) {
      cy.log("Error during login with invalid credentials:", e.message);
      throw e; // Rethrow the error for test failure
    }
  }
}
export default LoginPage;
