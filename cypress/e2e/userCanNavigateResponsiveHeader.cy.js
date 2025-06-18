/* eslint-disable no-undef */
describe('User can navigate responsive header', () => {
  beforeEach(() => {
    // Handle uncaught exceptions to prevent test failures
    cy.on('uncaught:exception', () => {
      return false;
    });
    
    cy.visit('/');
  });

  describe('Desktop Navigation', () => {
    beforeEach(() => {
      cy.viewport(1024, 768); // Desktop viewport
    });

    it('is expected to display the site title', () => {
      cy.get('[data-cy="site-title"]')
        .should('be.visible')
        .and('contain.text', 'Eira Client');
    });

    it('is expected to show desktop navigation links', () => {
      cy.get('[data-cy="nav-home"]').should('be.visible');
      cy.get('[data-cy="nav-authentication"]').should('be.visible');
    });

    it('is expected to show desktop language switcher', () => {
      cy.get('[data-cy="language-switcher"]').should('be.visible');
      cy.get('[data-cy="language-dropdown-button"]').should('be.visible');
    });

    it('is expected to hide mobile hamburger menu', () => {
      cy.get('[data-cy="mobile-menu-button"]').should('not.be.visible');
    });

    it('is expected to hide mobile menu', () => {
      cy.get('[data-cy="mobile-menu"]').should('not.exist');
    });

    it('is expected to navigate using desktop links', () => {
      cy.get('[data-cy="nav-authentication"]').click();
      cy.url().should('include', '/authentication');
      
      cy.get('[data-cy="nav-home"]').click();
      cy.url().should('not.include', '/authentication');
    });

    it('is expected to switch language using desktop dropdown', () => {
      cy.get('[data-cy="language-dropdown-button"]').click();
      cy.get('[data-cy="language-dropdown-menu"]').should('be.visible');
      
      cy.get('[data-cy="language-option-en"]').click();
      cy.get('[data-cy="nav-home"]').should('contain.text', 'Home');
      
      cy.get('[data-cy="language-dropdown-button"]').click();
      cy.get('[data-cy="language-option-sv"]').click();
      cy.get('[data-cy="nav-home"]').should('contain.text', 'Hem');
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      cy.viewport(375, 667); // Mobile viewport (iPhone SE)
    });

    it('is expected to display the site title on mobile', () => {
      cy.get('[data-cy="site-title"]')
        .should('be.visible')
        .and('contain.text', 'Eira Client');
    });

    it('is expected to hide desktop navigation on mobile', () => {
      cy.get('[data-cy="nav-home"]').should('not.be.visible');
      cy.get('[data-cy="nav-authentication"]').should('not.be.visible');
      cy.get('[data-cy="language-switcher"]').should('not.be.visible');
    });

    it('is expected to show mobile hamburger menu button', () => {
      cy.get('[data-cy="mobile-menu-button"]').should('be.visible');
    });

    it('is expected to initially hide mobile menu', () => {
      cy.get('[data-cy="mobile-menu"]').should('not.exist');
    });

    it('is expected to toggle mobile menu when hamburger is clicked', () => {
      // Open mobile menu
      cy.get('[data-cy="mobile-menu-button"]').click();
      cy.get('[data-cy="mobile-menu"]').should('be.visible');
      
      // Close mobile menu
      cy.get('[data-cy="mobile-menu-button"]').click();
      cy.get('[data-cy="mobile-menu"]').should('not.exist');
    });

    it('is expected to show hamburger icon when menu is closed', () => {
      cy.get('[data-cy="mobile-menu-button"] svg path')
        .should('have.attr', 'd')
        .and('include', 'M4 6h16M4 12h16M4 18h16'); // Hamburger icon path
    });

    it('is expected to show close icon when menu is open', () => {
      cy.get('[data-cy="mobile-menu-button"]').click();
      cy.get('[data-cy="mobile-menu-button"] svg path')
        .should('have.attr', 'd')
        .and('include', 'M6 18L18 6M6 6l12 12'); // Close icon path
    });

    it('is expected to display mobile navigation links when menu is open', () => {
      cy.get('[data-cy="mobile-menu-button"]').click();
      
      cy.get('[data-cy="mobile-nav-home"]').should('be.visible');
      cy.get('[data-cy="mobile-nav-authentication"]').should('be.visible');
    });

    it('is expected to navigate using mobile links and close menu', () => {
      cy.get('[data-cy="mobile-menu-button"]').click();
      
      cy.get('[data-cy="mobile-nav-authentication"]').click();
      cy.url().should('include', '/authentication');
      cy.get('[data-cy="mobile-menu"]').should('not.exist'); // Menu should close after navigation
      
      cy.get('[data-cy="mobile-menu-button"]').click();
      cy.get('[data-cy="mobile-nav-home"]').click();
      cy.url().should('not.include', '/authentication');
      cy.get('[data-cy="mobile-menu"]').should('not.exist'); // Menu should close after navigation
    });

    it('is expected to display mobile language switcher', () => {
      cy.get('[data-cy="mobile-menu-button"]').click();
      
      cy.get('[data-cy="mobile-language-sv"]').should('be.visible');
      cy.get('[data-cy="mobile-language-en"]').should('be.visible');
    });

    it('is expected to switch language using mobile language buttons', () => {
      cy.get('[data-cy="mobile-menu-button"]').click();
      
      // Switch to English
      cy.get('[data-cy="mobile-language-en"]').click();
      cy.get('[data-cy="mobile-menu"]').should('not.exist'); // Menu should close
      
      // Verify language changed
      cy.get('[data-cy="mobile-menu-button"]').click();
      cy.get('[data-cy="mobile-nav-home"]').should('contain.text', 'Home');
      
      // Switch back to Swedish
      cy.get('[data-cy="mobile-language-sv"]').click();
      cy.get('[data-cy="mobile-menu"]').should('not.exist'); // Menu should close
      
      // Verify language changed back
      cy.get('[data-cy="mobile-menu-button"]').click();
      cy.get('[data-cy="mobile-nav-home"]').should('contain.text', 'Hem');
    });

    it('is expected to highlight current language in mobile switcher', () => {
      cy.get('[data-cy="mobile-menu-button"]').click();
      
      // Swedish should be highlighted by default
      cy.get('[data-cy="mobile-language-sv"]')
        .should('have.class', 'bg-blue-100')
        .and('have.class', 'text-blue-800');
      
      cy.get('[data-cy="mobile-language-en"]')
        .should('have.class', 'bg-gray-100')
        .and('have.class', 'text-gray-700');
      
      // Switch to English
      cy.get('[data-cy="mobile-language-en"]').click();
      cy.get('[data-cy="mobile-menu-button"]').click();
      
      // English should now be highlighted
      cy.get('[data-cy="mobile-language-en"]')
        .should('have.class', 'bg-blue-100')
        .and('have.class', 'text-blue-800');
      
      cy.get('[data-cy="mobile-language-sv"]')
        .should('have.class', 'bg-gray-100')
        .and('have.class', 'text-gray-700');
    });
  });

  describe('Tablet Navigation', () => {
    beforeEach(() => {
      cy.viewport(768, 1024); // Tablet viewport (iPad)
    });

    it('is expected to show desktop navigation on tablet', () => {
      cy.get('[data-cy="nav-home"]').should('be.visible');
      cy.get('[data-cy="nav-authentication"]').should('be.visible');
      cy.get('[data-cy="language-switcher"]').should('be.visible');
      cy.get('[data-cy="mobile-menu-button"]').should('not.be.visible');
    });
  });

  describe('Responsive Breakpoint Testing', () => {
    it('is expected to switch from desktop to mobile layout at md breakpoint', () => {
      // Start with desktop layout
      cy.viewport(768, 1024);
      cy.get('[data-cy="nav-home"]').should('be.visible');
      cy.get('[data-cy="mobile-menu-button"]').should('not.be.visible');
      
      // Switch to mobile layout
      cy.viewport(767, 1024);
      cy.get('[data-cy="nav-home"]').should('not.be.visible');
      cy.get('[data-cy="mobile-menu-button"]').should('be.visible');
    });

    it('is expected to work correctly on various mobile devices', () => {
      const mobileViewports = [
        { name: 'iPhone SE', width: 375, height: 667 },
        { name: 'iPhone 12', width: 390, height: 844 },
        { name: 'Samsung Galaxy S21', width: 384, height: 832 },
        { name: 'iPhone 14 Pro Max', width: 430, height: 932 }
      ];

      mobileViewports.forEach(({ width, height }) => {
        cy.viewport(width, height);
        
        // Test basic mobile functionality for each device
        cy.get('[data-cy="site-title"]').should('be.visible');
        cy.get('[data-cy="mobile-menu-button"]').should('be.visible');
        cy.get('[data-cy="nav-home"]').should('not.be.visible');
        
        // Test menu toggle
        cy.get('[data-cy="mobile-menu-button"]').click();
        cy.get('[data-cy="mobile-menu"]').should('be.visible');
        cy.get('[data-cy="mobile-nav-home"]').should('be.visible');
        
        cy.get('[data-cy="mobile-menu-button"]').click();
        cy.get('[data-cy="mobile-menu"]').should('not.exist');
      });
    });
  });
});
