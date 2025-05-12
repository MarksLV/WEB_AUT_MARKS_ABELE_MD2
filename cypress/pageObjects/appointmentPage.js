import { BasePage } from "./basePage";

export class AppointmentPage extends BasePage {
  static get url() {
    return "https://katalon-demo-cura.herokuapp.com/";
  }

  static get menuToggle() {
    return cy.get('#menu-toggle');
  }
  static get loginLink() {
    return cy.get('a[href="profile.php#login"]');
  }
  static get usernameInput() {
    return cy.get('#txt-username');
  }
  static get passwordInput() {
    return cy.get('#txt-password');
  }
  static get loginButton() {
    return cy.get('#btn-login');
  }
  static get makeAppointmentButton() {
    return cy.get('#btn-make-appointment');
  }
  static get facilitySelect() {
    return cy.get('#combo_facility');
  }
  static get hospitalReadmissionCheckbox() {
    return cy.get('#chk_hospotal_readmission');
  }
  static get medicaidProgramRadio() {
    return cy.get('#radio_program_medicaid');
  }
  static get visitDateInput() {
    return cy.get('#txt_visit_date');
  }
  static get commentTextarea() {
    return cy.get('#txt_comment');
  }
  static get bookAppointmentButton() {
    return cy.get('#btn-book-appointment');
  }
  static get appointmentTitle() {
    return cy.get('h2').contains('Make Appointment');
  }
  static get confirmationHeader() {
    return cy.get('h2', { timeout: 6000 });
  }
  static get historyLink() {
    return cy.get('a[href="history.php#history"]');
  }
  static get noAppointmentText() {
    return cy.get('.text-center p');
  }
  static get sidebar() {
    return cy.get('#sidebar-wrapper');
  }

  // Login on the platform
  static login(username, password) {
    this.menuToggle.click();
    this.loginLink.click();
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.loginButton.click();
  }

  // Validate appointment confirmation using ID
  static validateAppointmentConfirmation({ facility, hospitalReadmission, program, date, comment }) {
    this.confirmationHeader.should('be.visible');
    this.confirmationHeader.should('contain.text', 'Appointment Confirmation');

    cy.get('#facility').should('contain.text', facility);
    const expectedReadmission = hospitalReadmission ? 'Yes' : 'No';
    cy.get('#hospital_readmission').should('contain.text', expectedReadmission);
    cy.get('#program').should('contain.text', program);
    cy.get('#visit_date').should('contain.text', date);
    cy.get('#comment').should('contain.text', comment);
  }

  // Navigate to appointment history
  static goToHistory() {
    this.menuToggle.click();
    this.historyLink.click();
  }
}
