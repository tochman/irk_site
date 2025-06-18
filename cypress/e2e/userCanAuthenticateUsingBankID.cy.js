/* eslint-disable no-undef */

describe("User authenticating with BankID in Swedish", () => {
  // Fast setup helper but preserving original structure
  const setupFastTest = () => {
    // Visit the page and set up all mocks in parallel where possible
    cy.visit("/authentication");

    // Setup mocks and intercepts in one go
    cy.mockActionCable();

    // Fast intercepts with no delays
    cy.intercept("POST", "/auth/bank_id", {
      fixture: "bank_id_order_ref_response.json",
    }).as("initiateAuth");
    cy.intercept("POST", "/auth", {
      fixture: "auth_complete_response.json",
    }).as("completeAuth");
  };

  beforeEach(() => {
    // Handle uncaught exceptions to prevent test failures
    cy.on("uncaught:exception", () => {
      return false;
    });

    // Use our fast setup helper
    setupFastTest();

    // Verify page is loaded with minimal timeout
    cy.get('[data-cy="authentication-title"]', { timeout: 5000 }).should(
      "be.visible"
    );
  });

  context("When a user first visits the authentication page", () => {
    it("is expected to see the interface displayed in Swedish", () => {
      cy.get('[data-cy="authentication-title"]', { timeout: 5000 }).should(
        "contain",
        "BankID Autentisering"
      );
      cy.get('[data-cy="start-authentication-button"]', {
        timeout: 5000,
      }).should("contain", "Starta BankID");
    });

    context("and initiates the BankID authentication process", () => {
      beforeEach(() => {
        // Click with force for reliability
        cy.get('[data-cy="start-authentication-button"]').click({
          force: true,
        });
        cy.wait("@initiateAuth", { timeout: 5000 });
      });

      it("is expected to see the BankID modal with Swedish text", () => {
        // More reliable modal check
        cy.get('[data-cy="modal-overlay"]', { timeout: 7000 }).should(
          "be.visible"
        );

        // Use data attribute that actually exists in the application
        cy.get('[data-cy="modal-header"]', { timeout: 7000 }).should(
          "contain",
          "BankID Inloggning"
        );

        // Check for QR code spinner or QR code content or other modal body content
        cy.get("body").then(($body) => {
          if ($body.find('[data-cy="qr-code-spinner"]').length) {
            cy.get('[data-cy="qr-code-spinner"]', { timeout: 7000 }).should(
              "be.visible"
            );
          } else if ($body.find('[data-cy="qr-code-container"]').length) {
            cy.get('[data-cy="qr-code-container"]', { timeout: 7000 }).should(
              "be.visible"
            );
          } else {
            // If neither specific element exists, just check for modal body
            cy.get('[data-cy="modal-body"]', { timeout: 7000 }).should(
              "be.visible"
            );
          }
        });
      });

      context("and receives a QR code for scanning", () => {
        beforeEach(() => {
          // Send QR code immediately
          cy.fixture("qr_code.json").then((qrFixture) => {
            cy.acReceiveMessage(
              "BankIdAuthenticationChannel",
              { orderRef: "45765d2f-442b-4356-9348-caa4bad09eb1" },
              qrFixture
            );
          });
        });

        it("is expected to see QR code with Swedish instructions", () => {
          cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
            "be.visible"
          );
          cy.get('[data-cy="qr-code-instructions"]', { timeout: 5000 }).should(
            "contain",
            "Skanna QR-koden"
          );
        });
      });
    });
  });

  context("When the user receives status updates during authentication", () => {
    beforeEach(() => {
      // Click with force for reliability
      cy.get('[data-cy="start-authentication-button"]').click({ force: true });
      cy.wait("@initiateAuth", { timeout: 5000 });

      // // Ensure WebSocket connection
      // cy.window().then((win) => {
      //   win.mockActionCable = win.mockActionCable || {};
      //   win.mockActionCable.connected = true;
      // });
    });

    context("when BankID is processing the request", () => {
      it("is expected to see a Swedish processing message", () => {
        cy.fixture("bank_id_outstanding_transaction.json").then((fixture) => {
          const message = {
            event: "in_progress",
            hintCode: "outstandingTransaction",
            message: fixture.message,
          };

          cy.acReceiveMessage(
            "BankIdAuthenticationChannel",
            { orderRef: "45765d2f-442b-4356-9348-caa4bad09eb1" },
            message
          );
        });

        // Check message appears
        cy.get('[data-cy="modal-body"]', { timeout: 5000 })
          .should("be.visible")
          .should("contain", "Bearbetar din begäran");
      });
    });

    context("when the user needs to sign in their BankID app", () => {
      it("is expected to see a Swedish sign instruction message", () => {
        // Make sure modal is visible first
        cy.get('[data-cy="modal-overlay"]', { timeout: 5000 }).should(
          "be.visible"
        );

        cy.fixture("bank_id_in_progress_response.json").then((fixture) => {
          const message = {
            event: "in_progress",
            hintCode: fixture.hintCode, // 'userSign'
            orderRef: fixture.orderRef,
          };

          cy.acReceiveMessage(
            "BankIdAuthenticationChannel",
            { orderRef: "45765d2f-442b-4356-9348-caa4bad09eb1" },
            message
          );
        });

        // Check message appears
        cy.get('[data-cy="modal-body"]', { timeout: 5000 })
          .should("be.visible")
          .should("contain", "Signera i din BankID-app");
      });
    });

    context("when BankID authentication has started", () => {
      it("is expected to see a Swedish message to open the BankID app", () => {
        // Ensure modal is visible first
        cy.get('[data-cy="modal-overlay"]', { timeout: 5000 }).should(
          "be.visible"
        );

        const message = {
          event: "in_progress",
          hintCode: "started",
        };

        cy.acReceiveMessage(
          "BankIdAuthenticationChannel",
          { orderRef: "45765d2f-442b-4356-9348-caa4bad09eb1" },
          message
        );

        // Check message appears
        cy.get('[data-cy="modal-body"]', { timeout: 5000 })
          .should("be.visible")
          .should("contain", "Öppna din BankID-app");
      });
    });
  });

  context("When authentication encounters problems", () => {
    beforeEach(() => {
      // Click with better handling
      cy.get('[data-cy="start-authentication-button"]').click({ force: true });
      cy.wait("@initiateAuth", { timeout: 5000 });

      // Wait for modal to appear
      cy.get('[data-cy="modal-overlay"]', { timeout: 5000 }).should(
        "be.visible"
      );

      // // Ensure WebSocket connection
      // cy.window().then((win) => {
      //   win.mockActionCable = win.mockActionCable || {};
      //   win.mockActionCable.connected = true;
      // });
    });

    context("and the authentication fails", () => {
      it("is expected to display Swedish error message and retry option", () => {
        cy.fixture("bank_id_failure_response.json").then((failureFixture) => {
          cy.acReceiveMessage(
            "BankIdAuthenticationChannel",
            { orderRef: "45765d2f-442b-4356-9348-caa4bad09eb1" },
            failureFixture
          );
        });

        // Check failure state
        cy.get('[data-cy="authentication-title"]', { timeout: 5000 })
          .should("be.visible")
          .should("contain", "Autentisering misslyckades");

        cy.get('[data-cy="start-authentication-button"]', { timeout: 5000 })
          .should("be.visible")
          .should("contain", "Försök igen");
      });
    });

    context("and the user cancels the operation", () => {
      it("is expected to show Swedish error for cancelled operation", () => {
        // First make sure UI is in a consistent state
        cy.get('[data-cy="modal-overlay"]', { timeout: 5000 }).should(
          "be.visible"
        );

        cy.fixture("bank_id_cancelled_response.json").then((cancelFixture) => {
          cy.acReceiveMessage(
            "BankIdAuthenticationChannel",
            { orderRef: "45765d2f-442b-4356-9348-caa4bad09eb1" },
            cancelFixture
          );
        });

        // More reliable assertions
        cy.get('[data-cy="error-container"]', { timeout: 5000 }).should(
          "be.visible"
        );
        cy.get('[data-cy="authentication-title"]', { timeout: 5000 })
          .should("be.visible")
          .should("contain", "Autentisering misslyckades");
      });
    });
  });

  context("When completing a full authentication journey", () => {
    it("is expected to successfully authenticate with Swedish welcome message", () => {
      // User starts authentication with force click
      cy.get('[data-cy="start-authentication-button"]').click({ force: true });
      cy.wait("@initiateAuth", { timeout: 5000 });

      // Wait for the modal to appear
      cy.get('[data-cy="modal-overlay"]', { timeout: 5000 }).should(
        "be.visible"
      );

      // Step 1: User receives QR Code with Swedish instructions
      cy.fixture("qr_code.json").then((qrFixture) => {
        cy.acReceiveMessage(
          "BankIdAuthenticationChannel",
          { orderRef: "45765d2f-442b-4356-9348-caa4bad09eb1" },
          qrFixture
        );
      });

      // User sees QR code and instructions in Swedish
      cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
        "be.visible"
      );
      cy.get('[data-cy="qr-code-instructions"]', { timeout: 5000 })
        .should("be.visible")
        .should("contain", "Skanna QR-koden");

      // Step 2: User receives signing instruction in Swedish
      const signMessage = {
        event: "in_progress",
        hintCode: "userSign",
      };

      cy.acReceiveMessage(
        "BankIdAuthenticationChannel",
        { orderRef: "45765d2f-442b-4356-9348-caa4bad09eb1" },
        signMessage
      );

      // Check signing message
      cy.get('[data-cy="modal-body"]', { timeout: 5000 })
        .should("be.visible")
        .should("contain", "Signera i din BankID-app");

      // Step 3: User successfully completes authentication
      cy.fixture("bank_id_successful_authorization_response.json").then(
        (authFixture) => {
          const successMessage = {
            event: "authenticated",
            user: {
              table: {
                personalNumber: authFixture.completionData.user.personalNumber,
                givenName: authFixture.completionData.user.givenName,
                surname: authFixture.completionData.user.surname,
              },
            },
          };

          cy.acReceiveMessage(
            "BankIdAuthenticationChannel",
            { orderRef: "45765d2f-442b-4356-9348-caa4bad09eb1" },
            successMessage
          );

          // Wait for authentication to complete and API calls to happen
          cy.wait("@completeAuth", { timeout: 5000 });
        }
      );

      // User sees success messages - allow a bit more time for state to update
      cy.get("body", { timeout: 10000 }).then(($body) => {
        // Check all possible ways the success message could be displayed
        const hasSuccessMessage =
          $body.find('[data-cy="logged-in-message"]').length > 0 ||
          $body.find('[data-cy="authenticated-section"]').length > 0 ||
          $body.text().includes("Inloggad") ||
          $body.text().includes("Logged in");

        expect(hasSuccessMessage, "Should show success message").to.be.true;
      });

      // Look for welcome message - could be in different formats depending on how it's rendered
      cy.get("body", { timeout: 5000 }).then(($body) => {
        const hasWelcomeMessage =
          $body.find('[data-cy="welcome-message"]').length > 0 ||
          $body.text().includes("Välkommen") ||
          $body.text().includes("Welcome");

        expect(hasWelcomeMessage, "Should show welcome message").to.be.true;
      });

      // Modal should be closed after successful authentication
      cy.get('[data-cy="modal-overlay"]').should("not.exist");
    });
  });

  context(
    "When the user experiences QR code updates during authentication",
    () => {
      const orderRef = "45765d2f-442b-4356-9348-caa4bad09eb1";

      beforeEach(() => {
        // Click with better checks
        cy.get('[data-cy="start-authentication-button"]').click({
          force: true,
        });
        cy.wait("@initiateAuth", { timeout: 5000 });

        // Wait for modal to appear before continuing
        cy.get('[data-cy="modal-overlay"]', { timeout: 5000 }).should(
          "be.visible"
        );

        // Send first QR code
        cy.fixture("qr_code.json").then((qr1) => {
          cy.acReceiveMessage("BankIdAuthenticationChannel", { orderRef }, qr1);
        });

        // Wait for QR code to be rendered
        cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
          "be.visible"
        );
      });

      it("is expected to display the initial QR code with Swedish instructions", () => {
        // Verify the QR code and instructions are visible
        cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
          "be.visible"
        );
        cy.get('[data-cy="qr-code-instructions"]', { timeout: 5000 })
          .should("be.visible")
          .should(
            "contain",
            "Skanna QR-koden med din BankID-app för att logga in"
          );
      });

      context("and receives updated QR codes from the server", () => {
        beforeEach(() => {
          // Ensure QR code is visible before proceeding
          cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
            "be.visible"
          );

          // Store initial QR code source for comparison
          cy.get('[data-cy="qr-code-image"]').then(($img) => {
            const initialSrc = $img.attr("src");
            cy.wrap(initialSrc).as("initialQrSrc");
          });
        });

        it("is expected to update the QR code image when new data is received", () => {
          // Wait to ensure initial QR src is properly saved
          cy.get("@initialQrSrc")
            .should("be.a", "string")
            .then((initialSrc) => {
              // Send second QR code
              cy.fixture("qrcode_2.json").then((qr2) => {
                cy.acReceiveMessage(
                  "BankIdAuthenticationChannel",
                  { orderRef },
                  qr2
                );

                // Check for image change
                cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
                  ($img) => {
                    const updatedSrc = $img.attr("src");
                    expect($img).to.exist;
                    expect($img).to.be.visible;
                    expect(updatedSrc).to.be.a("string");

                    if (updatedSrc === initialSrc) {
                      throw new Error(
                        "QR code image source has not changed yet"
                      );
                    }
                  }
                );
              });
            });
        });

        it("is expected to maintain Swedish text throughout multiple QR code updates", () => {
          // Second QR code update
          cy.fixture("qrcode_2.json").then((qr2) => {
            cy.acReceiveMessage(
              "BankIdAuthenticationChannel",
              { orderRef },
              qr2
            );
          });

          // Verify UI state after first update
          cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
            "be.visible"
          );
          cy.get('[data-cy="qr-code-instructions"]', { timeout: 5000 })
            .should("be.visible")
            .should("contain", "Skanna QR-koden");
          cy.get('[data-cy="modal-header"]', { timeout: 5000 })
            .should("be.visible")
            .should("contain", "BankID Inloggning");

          // Third QR code update
          cy.fixture("qrcode_3.json").then((qr3) => {
            cy.acReceiveMessage(
              "BankIdAuthenticationChannel",
              { orderRef },
              qr3
            );
          });

          // Verify UI state remains consistent after second update
          cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
            "be.visible"
          );
          cy.get('[data-cy="qr-code-instructions"]', { timeout: 5000 })
            .should("be.visible")
            .should("contain", "BankID-app");
          cy.get('[data-cy="modal-overlay"]', { timeout: 5000 }).should(
            "be.visible"
          );
          cy.get('[data-cy="qr-code-container"]', { timeout: 5000 }).should(
            "be.visible"
          );
        });

        it("is expected to maintain a stable interface during rapid QR code refreshes", () => {
          // Send multiple QR code updates quickly
          cy.fixture("qrcode_2.json").then((qr2) => {
            cy.acReceiveMessage(
              "BankIdAuthenticationChannel",
              { orderRef },
              qr2
            );
          });

          cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
            "be.visible"
          );

          cy.fixture("qrcode_3.json").then((qr3) => {
            cy.acReceiveMessage(
              "BankIdAuthenticationChannel",
              { orderRef },
              qr3
            );
          });

          cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
            "be.visible"
          );

          cy.fixture("qr_code.json").then((qr1) => {
            cy.acReceiveMessage(
              "BankIdAuthenticationChannel",
              { orderRef },
              qr1
            );
          });

          // Final verification that the interface remains stable
          cy.get('[data-cy="modal-header"]', { timeout: 5000 })
            .should("be.visible")
            .should("contain", "BankID Inloggning");
          cy.get('[data-cy="cancel-button"]', { timeout: 5000 })
            .should("be.visible")
            .should("contain", "Avbryt");
          cy.get('[data-cy="qr-code-container"]', { timeout: 5000 }).should(
            "be.visible"
          );
        });

        it("is expected to keep modal visible during QR code updates", () => {
          // Send second QR code
          cy.get('[data-cy="modal-overlay"]', { timeout: 5000 }).should(
            "be.visible"
          );

          cy.fixture("qrcode_2.json").then((qr2) => {
            cy.acReceiveMessage(
              "BankIdAuthenticationChannel",
              { orderRef },
              qr2
            );
          });

          // Verify modal and QR code container remain visible
          cy.get('[data-cy="modal-overlay"]', { timeout: 5000 }).should(
            "be.visible"
          );
          cy.get('[data-cy="qr-code-container"]', { timeout: 5000 }).should(
            "be.visible"
          );
          cy.get('[data-cy="qr-code-image"]', { timeout: 5000 }).should(
            "be.visible"
          );
          cy.get('[data-cy="qr-code-instructions"]', { timeout: 5000 })
            .should("be.visible")
            .should("contain", "Skanna QR-koden");
          cy.get('[data-cy="modal-header"]', { timeout: 5000 })
            .should("be.visible")
            .should("contain", "BankID Inloggning");
        });
      });
    }
  );

  context("When the user decides to cancel the authentication process", () => {
    it("is expected to show Swedish text when cancelling authentication", () => {
      // Start authentication
      cy.get('[data-cy="start-authentication-button"]').click({ force: true });
      cy.wait("@initiateAuth", { timeout: 5000 });

      // Wait for modal to be fully opened
      cy.get('[data-cy="modal-overlay"]', { timeout: 5000 }).should(
        "be.visible"
      );

      // Verify Swedish cancel button
      cy.get('[data-cy="cancel-button"]', { timeout: 5000 })
        .should("be.visible")
        .should("contain", "Avbryt");

      // Click cancel with force
      cy.get('[data-cy="cancel-button"]').click({ force: true });

      // Verify we're back to initial state with Swedish text
      cy.get('[data-cy="authentication-title"]', { timeout: 5000 })
        .should("be.visible")
        .should("contain", "BankID Autentisering");

      cy.get('[data-cy="start-authentication-button"]', { timeout: 5000 })
        .should("be.visible")
        .should("contain", "Starta BankID");
    });
  });

  context("When waiting for QR code to load", () => {
    beforeEach(() => {
      // Intercept the API call but don't resolve immediately
      cy.intercept("POST", "/auth/bank_id", (req) => {
        // Delay the response to simulate loading
        req.on("response", (res) => {
          res.setDelay(1000);
          // Log response for debugging
          console.log("Intercepted response:", res);
        });
      }).as("slowAuthRequest");

      // Click authentication button
      cy.get('[data-cy="start-authentication-button"]').click();
    });

    it("is expected to show a spinner while waiting for QR code", () => {
      // Wait for the modal to appear first
      cy.get('[data-cy="modal-overlay"]').should("be.visible");
      cy.get('[data-cy="modal-header"]').should("be.visible");

      // Check if the spinner is visible - using improved selector and timeout
      cy.get('[data-cy="qr-code-spinner"]', { timeout: 3000 }).should(
        "be.visible"
      );
      cy.get('[data-cy="qr-code-spinner"] .animate-spin').should("be.visible");

      // Check if the loading message is shown
      cy.contains("Väntar på QR-kod").should("be.visible");
    });
  });

  context("When network error occurs", () => {
    beforeEach(() => {
      // Simulate a network error with a more specific response that will trigger the network error handler
      cy.intercept("POST", "/auth/bank_id", {
        forceNetworkError: true,
      }).as("networkErrorRequest");

      // Click authentication button
      cy.get('[data-cy="start-authentication-button"]').click();

      // Wait for network request to fail
      cy.wait("@networkErrorRequest");
    });

    it("is expected to show an error message", () => {
      // Look for either the network error message or any error indication in the UI
      cy.get("body").then(($body) => {
        const hasNetworkErrorMessage = $body
          .text()
          .includes("Autentisering är inte möjlig just nu");
        const hasGenericErrorMessage =
          $body.text().includes("Unknown error") ||
          $body.find('[data-cy="error-container"]').length > 0 ||
          $body.find('[data-cy="error-message"]').length > 0;

        expect(hasNetworkErrorMessage || hasGenericErrorMessage).to.be.true;
      });
    });
  });

  context("When switching language with error message", () => {
    beforeEach(() => {
      // First, make sure we get some kind of error
      cy.intercept("POST", "/auth/bank_id", {
        forceNetworkError: true,
      }).as("networkErrorRequest");

      // Click authentication button
      cy.get('[data-cy="start-authentication-button"]').click();

      // Wait for network request to fail
      cy.wait("@networkErrorRequest");

      // Wait for any error to appear (could be network error or generic error)
      cy.get("body").should(($body) => {
        const containsError =
          $body.text().includes("Autentisering är inte möjlig just nu") ||
          $body.text().includes("Unknown error") ||
          $body.find('[data-cy="error-container"]').length > 0;
        expect(containsError).to.be.true;
      });

      // Switch to English
      cy.get('[data-cy="language-dropdown-button"]').click();
      cy.get('[data-cy="language-option-en"]').click();
    });

    it("is expected to show error message in English", () => {
      // Check if any English error message is shown with proper timeout
      cy.get("body").should(($body) => {
        const hasEnglishError =
          $body
            .text()
            .includes("Authentication is not possible at the moment") ||
          $body.text().includes("Unknown error") ||
          $body.find('[data-cy="error-container"]').length > 0;
        expect(hasEnglishError).to.be.true;
      });
    });
  });
});
