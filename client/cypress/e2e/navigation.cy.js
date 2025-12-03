describe('Navigation E2E Tests', () => {
  it('should navigate between public pages', () => {
    cy.visit('/');
    cy.contains('CareStack Clinic').should('be.visible');
    
    cy.contains('Sign In').click();
    cy.url().should('include', '/login');
    
    cy.contains('Home').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    cy.contains('Doctor Signup').click();
    cy.url().should('include', '/signup-doctor');
    
    cy.contains('Home').click();
    cy.contains('Caregiver Signup').click();
    cy.url().should('include', '/signup-caregiver');
  });

  it('should handle logout functionality', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'mock-token');
      win.localStorage.setItem('role', 'admin');
    });
    
    cy.visit('/dashboard');
    cy.contains('Sign Out').click();
    cy.url().should('include', '/login');
    
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.be.null;
      expect(win.localStorage.getItem('role')).to.be.null;
    });
  });
});

