import { AppointmentPage } from "../../pageObjects/appointmentPage";

describe("CURA Healthcare Service", () => {

  // Login details
  const demoCredentials = {
    username: "John Doe",
    password: "ThisIsNotAPassword"
  };

  beforeEach(() => {
    AppointmentPage.visit();
  });

  it("Scenario 1 - Make an Appointment", () => {
    // Login
    AppointmentPage.login(demoCredentials.username, demoCredentials.password);

    // Appointment data for booking.
    const appointmentData = {
      facility: "Seoul CURA Healthcare Center",
      hospitalReadmission: true,
      program: "Medicaid",
      date: "12/05/2025",
      comment: "CURA Healthcare Service"
    };

    // Fill in the form and book appointment
    AppointmentPage.facilitySelect.select(appointmentData.facility);

    if (appointmentData.hospitalReadmission) {
      AppointmentPage.hospitalReadmissionCheckbox.check();
    }

    AppointmentPage.medicaidProgramRadio.check();

    // Type in 30 inside search bar
    AppointmentPage.visitDateInput.type("30");

    AppointmentPage.appointmentTitle.click();
    AppointmentPage.commentTextarea.type(appointmentData.comment, { force: true });
    AppointmentPage.bookAppointmentButton.click();

    // Validate that the appointment confirmation page displays the expected details.
    AppointmentPage.validateAppointmentConfirmation(appointmentData);

  });

  it("Scenario 2 - Appointment history empty", () => {

    // Login
    AppointmentPage.login(demoCredentials.username, demoCredentials.password);

    // Open the menu
    AppointmentPage.menuToggle.click();
    AppointmentPage.sidebar.should('have.class', 'active');

    // Check History
    AppointmentPage.historyLink.click();

    // Validate "No appointment" message
    AppointmentPage.noAppointmentText.should('be.visible');
    AppointmentPage.noAppointmentText.should('contain.text', 'No appointment');

  });
});
