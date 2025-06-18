/* eslint-disable no-undef */
describe('Language Switcher in Header', () => {
  beforeEach(() => {
    // Handle uncaught exceptions to prevent test failures
    cy.on('uncaught:exception', () => {
      return false;
    });
  });

  context('When a user visits the application', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('is expected to display the header with navigation elements', () => {
      cy.get('[data-cy="main-header"]').should('be.visible');
      cy.get('[data-cy="nav-home"]').should('be.visible');
      cy.get('[data-cy="nav-authentication"]').should('be.visible');
    });

    it('is expected to display the language switcher dropdown in the header', () => {
      cy.get('[data-cy="language-switcher"]').should('be.visible');
      cy.get('[data-cy="language-dropdown-button"]').should('be.visible');
      
      // Click to open dropdown
      cy.get('[data-cy="language-dropdown-button"]').click();
      cy.get('[data-cy="language-dropdown-menu"]').should('be.visible');
      cy.get('[data-cy="language-option-sv"]').should('be.visible');
      cy.get('[data-cy="language-option-en"]').should('be.visible');
      
      // Check for language options instead of specific flag elements
      cy.get('[data-cy="language-option-sv"]').contains('Svenska').should('be.visible');
      cy.get('[data-cy="language-option-en"]').contains('English').should('be.visible');
    });

    it('is expected to show Swedish as the default language', () => {
      // Check that Swedish is shown in the dropdown button
      cy.get('[data-cy="language-dropdown-button"]')
        .should('be.visible')
        .within(() => {
          cy.contains('SV').should('be.visible');
          cy.get('[data-cy="current-flag-sv"]').should('be.visible');
        });
      cy.get('[data-cy="hero-title"]').should('contain', 'Välkommen till Eira Client');
    });
  });

  context('When a user clicks the English language option', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('[data-cy="hero-title"]', { timeout: 10000 }).should('be.visible');
    });

    it('is expected to switch the interface to English', () => {
      // Open dropdown and click English option
      cy.get('[data-cy="language-dropdown-button"]', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.get('[data-cy="language-option-en"]')
        .should('be.visible')
        .click();
      
      // Wait for language change and verify English content
      cy.get('[data-cy="hero-title"]')
        .should('be.visible')
        .should('contain', 'Welcome to Eira Client')
        .then(() => {
          // Verify the dropdown button shows English
          cy.get('[data-cy="language-dropdown-button"]')
            .should('be.visible')
            .within(() => {
              cy.contains('EN').should('be.visible');
              cy.get('[data-cy="current-flag-en"]').should('be.visible');
            });

          // Check navigation elements
          cy.get('[data-cy="nav-home"]')
            .should('be.visible')
            .should('contain', 'Home');
          cy.get('[data-cy="nav-authentication"]')
            .should('be.visible')
            .should('contain', 'Authentication');
        });
    });

    it('is expected to persist the language choice when navigating', () => {
      // Switch to English first
      cy.get('[data-cy="language-dropdown-button"]', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.get('[data-cy="language-option-en"]')
        .should('be.visible')
        .click();
      
      // Wait for language change
      cy.get('[data-cy="hero-title"]')
        .should('be.visible')
        .should('contain', 'Welcome to Eira Client')
        .then(() => {
          // Navigate to authentication page
          cy.get('[data-cy="nav-authentication"]')
            .should('be.visible')
            .click();
          
          // Verify English persists
          cy.get('[data-cy="language-dropdown-button"]')
            .should('be.visible')
            .within(() => {
              cy.contains('EN').should('be.visible');
              cy.get('[data-cy="current-flag-en"]').should('be.visible');
            });
          cy.get('[data-cy="authentication-title"]')
            .should('be.visible')
            .should('contain', 'BankID Authentication');
        });
    });
  });

  context('When a user clicks the Swedish language option', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('[data-cy="hero-title"]', { timeout: 10000 }).should('be.visible');
    });

    it('is expected to switch the interface to Swedish', () => {
      // First switch to English
      cy.get('[data-cy="language-dropdown-button"]', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.get('[data-cy="language-option-en"]')
        .should('be.visible')
        .click();
      
      // Verify English is selected
      cy.get('[data-cy="hero-title"]')
        .should('be.visible')
        .should('contain', 'Welcome to Eira Client')
        .then(() => {
          // Switch back to Swedish
          cy.get('[data-cy="language-dropdown-button"]')
            .should('be.visible')
            .click();
          cy.get('[data-cy="language-option-sv"]')
            .should('be.visible')
            .click();
          
          // Verify Swedish content and UI
          cy.get('[data-cy="hero-title"]')
            .should('be.visible')
            .should('contain', 'Välkommen till Eira Client')
            .then(() => {
              cy.get('[data-cy="language-dropdown-button"]')
                .should('be.visible')
                .within(() => {
                  cy.contains('SV').should('be.visible');
                  cy.get('[data-cy="current-flag-sv"]').should('be.visible');
                });
            });
        });
    });
  });

  context('When a user is on the authentication page', () => {
    beforeEach(() => {
      cy.visit('/authentication');
      cy.get('[data-cy="authentication-title"]', { timeout: 10000 }).should('be.visible');
    });

    it('is expected to display the language switcher in the header', () => {
      cy.get('[data-cy="main-header"]').should('be.visible');
      cy.get('[data-cy="language-switcher"]').should('be.visible');
    });

    it('is expected to switch language and update authentication content', () => {
      cy.get('[data-cy="language-dropdown-button"]', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.get('[data-cy="language-option-en"]')
        .should('be.visible')
        .click();
      
      // Check authentication page content in English
      cy.get('[data-cy="authentication-title"]')
        .should('be.visible')
        .should('contain', 'BankID Authentication');
      cy.get('[data-cy="start-authentication-button"]')
        .should('be.visible')
        .should('contain', 'Start BankID');
    });
  });
});
