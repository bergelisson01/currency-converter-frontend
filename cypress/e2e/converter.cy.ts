describe('Currency Converter App', () => {
  it('should convert currency and display recent transactions', () => {
    cy.visit('/');

    // Fill in amount
    cy.get('[data-testid="amount-input"]').type('100');

    // Click convert button
    cy.get('[data-testid="convert-button"]').click();

    // Wait for API response and assert result is shown
    cy.contains('Result').should('exist');

    // Check that recent transactions are rendered
    cy.contains('Recent Transactions').should('exist');
  });
});
