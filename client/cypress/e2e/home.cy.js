describe('Home Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page correctly', () => {
    cy.contains('Welcome to CareStack Clinic').should('be.visible');
    cy.contains('A modern and secure platform').should('be.visible');
    cy.get('a[href="/login"]').should('be.visible').and('contain', 'Sign In');
  });

  it('should navigate to login page when Sign In is clicked', () => {
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
    cy.contains('Welcome Back').should('be.visible');
  });

  it('should have navigation links in navbar', () => {
    cy.contains('Home').should('be.visible');
    cy.contains('Sign In').should('be.visible');
    cy.contains('Doctor Signup').should('be.visible');
    cy.contains('Caregiver Signup').should('be.visible');
  });
});

