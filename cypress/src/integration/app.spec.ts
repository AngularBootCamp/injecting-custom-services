export const app =
  'Step: ' +
  Cypress.config()
    .integrationFolder.split('\\')
    .find(pathSegment => /[0-9]/.test(pathSegment));

// since this test is exactly the same as 300,
// we can use this test to look skip, this can
// be used on both describe and it blocks,
// you can also use only (it.only or describe.only)
// if you only want to run one test or suite of tests
describe(app, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe.skip('skipped describe block', () => {
    it('skipped it block', () => {});
  });

  it('should load the real employees', () => {
    cy.get('.collection-item').should('have.length', 100);
    cy.contains('Henry Holmes');
  });

  it.skip('should load the stubbed employees, checking for loading indicator', () => {
    cy.server();
    cy.route({
      url: '/api/employees',
      response: [
        {
          email: 'hholmes0@goodreads.com',
          first_name: 'Henry',
          hourly_wage: 19,
          hours_worked: 29,
          id: 1,
          last_name: 'Holmes'
        },
        {
          email: 'hcox1@who.int',
          first_name: 'Harold',
          hourly_wage: 11,
          hours_worked: 18,
          id: 2,
          last_name: 'Cox'
        }
      ],
      // using this delay will allow for reliable testing of the loading indicator
      delay: 1000
    }).as('getEmployees');

    cy.contains('loading');
    cy.wait('@getEmployees');
    cy.get('.collection-item').should('have.length', 2);
    cy.contains('Henry Holmes');
  });

  it.skip('should handle not being able to get any employees', () => {
    cy.server();
    cy.route({
      url: '/api/employees',
      response: []
    }).as('getEmployees');
    cy.contains('loading');
    cy.get('.collection-item').should('not.exist');
  });
});
