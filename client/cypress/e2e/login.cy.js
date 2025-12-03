describe('Login Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.clearLocalStorage();
  });

  it('should display login form', () => {
    cy.contains('Welcome Back').should('be.visible');
    cy.contains('Sign in to your CareStack account').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Sign In');
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    // Wait for error message
    cy.wait(1000);
    cy.contains('Invalid email or password', { timeout: 5000 }).should('be.visible');
  });

  it('should validate required fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('input[name="email"]:invalid').should('exist');
    cy.get('input[name="password"]:invalid').should('exist');
  });

  it('should navigate to signup pages from navbar', () => {
    cy.contains('Doctor Signup').click();
    cy.url().should('include', '/signup-doctor');
    
    cy.visit('/login');
    cy.contains('Caregiver Signup').click();
    cy.url().should('include', '/signup-caregiver');
  });
});

