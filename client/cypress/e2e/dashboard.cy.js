describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    // Mock login by setting localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'mock-token-12345');
      win.localStorage.setItem('role', 'admin');
    });
  });

  it('should redirect to login if not authenticated', () => {
    cy.clearLocalStorage();
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

  it('should display admin dashboard with all cards', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'mock-token');
      win.localStorage.setItem('role', 'admin');
    });
    
    cy.visit('/dashboard');
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Welcome, Administrator').should('be.visible');
    cy.contains('Manage Patients').should('be.visible');
    cy.contains('Add Patient').should('be.visible');
    cy.contains('Manage Medications').should('be.visible');
    cy.contains('Create User').should('be.visible');
  });

  it('should display doctor dashboard with limited cards', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'mock-token');
      win.localStorage.setItem('role', 'doctor');
    });
    
    cy.visit('/dashboard');
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Welcome, Doctor').should('be.visible');
    cy.contains('My Patients').should('be.visible');
    cy.contains('Add Patient').should('be.visible');
    cy.contains('Manage Medications').should('not.exist');
  });

  it('should navigate to patients page from dashboard', () => {
    cy.visit('/dashboard');
    cy.contains('Manage Patients').click();
    cy.url().should('include', '/patients');
  });
});

